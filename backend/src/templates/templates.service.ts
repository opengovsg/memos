import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  Editor,
  Issuer,
  Template,
  TemplateVersion,
  User,
} from 'database/entities'
import { Repository } from 'typeorm'
import { TemplateStatus } from 'types'
import {
  CreateTemplateDto,
  CreateTemplateResponseDto,
  GetTemplateResponseDto,
  UpdateTemplateDto,
  UpdateTemplateResponseDto,
} from './dto'
import { isTemplateEditorOrIssuer } from './templates.util'

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private templateRepository: Repository<Template>,
    @InjectRepository(TemplateVersion)
    private templateVersionRepository: Repository<TemplateVersion>,
    @InjectRepository(Editor)
    private editorRepository: Repository<Editor>,
    @InjectRepository(Issuer)
    private issuerRepository: Repository<Issuer>,
  ) {}

  // Creates a new template
  async createTemplate(
    author: User,
    _data: CreateTemplateDto,
  ): Promise<CreateTemplateResponseDto> {
    const { name, body } = _data

    return this.templateRepository.manager.transaction(async () => {
      // Create template
      const template = this.templateRepository.create({
        name,
        author,
        status: TemplateStatus.Public,
      })
      await this.templateRepository.save(template)

      // Create template version
      const templateVersion = this.templateVersionRepository.create({
        template,
        editor: author,
        version: 1, // new template, first version
        body,
        paramsRequired: [], // TODO fix once templating service is implemented
      })
      await this.templateVersionRepository.save(templateVersion)

      // Add author as an editor and issuer
      const editor = this.editorRepository.create({
        template,
        user: author,
      })
      await this.editorRepository.save(editor)

      const issuer = this.issuerRepository.create({
        template,
        user: author,
      })
      await this.issuerRepository.save(issuer)

      return { id: template.id, version: templateVersion.version }
    })
  }

  async updateTemplate(
    _data: UpdateTemplateDto & { templateId: number },
  ): Promise<UpdateTemplateResponseDto> {
    // Do something with data
    return { id: 1, version: 2 }
  }
  async hideTemplate(_templateId: number): Promise<void> {
    return
  }

  // Retrieves an existing template
  async getTemplate(
    requester: User,
    _templateId: number,
  ): Promise<GetTemplateResponseDto> {
    // Find template
    const template = await this.templateRepository.findOne({
      where: {
        id: _templateId,
      },
      relations: ['author'],
    })
    if (!template) {
      throw new NotFoundException()
    }

    // Check if requester is editor/issuer
    // TODO: this might be a guard (?)
    const isAllowed = await isTemplateEditorOrIssuer(
      requester,
      this.editorRepository,
      this.issuerRepository,
      _templateId,
    )
    if (!isAllowed) {
      throw new ForbiddenException()
    }

    // Find latest template version
    const templateVersion = await this.templateVersionRepository.findOne({
      where: {
        template,
      },
      order: {
        version: 'DESC',
      },
      relations: ['editor'],
    })
    if (!templateVersion) {
      // Template found but no versions exist. This is an anomaly, should take a closer look into the error.
      throw new NotFoundException()
    }

    return {
      id: template.id,
      version: templateVersion.version,
      status: template.status,
      author: template.author.id,
      editor: templateVersion.editor.id,
      name: template.name,
      body: templateVersion.body,
      paramsRequired: templateVersion.paramsRequired,
    }
  }

  async listTemplatesForUser(): Promise<void> {
    return
  }
}
