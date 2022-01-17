import { Injectable } from '@nestjs/common'
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
  UpdateTemplateDto,
  UpdateTemplateResponseDto,
} from './dto'

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
        paramsRequired: {}, // TODO fix once templating service is implemented
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
  async getTemplate(_templateId: number): Promise<void> {
    return
  }
  async listTemplatesForUser(): Promise<void> {
    return
  }
}
