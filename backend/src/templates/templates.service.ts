import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import {
  Editor,
  Issuer,
  Template,
  TemplateVersion,
  User,
} from 'database/entities'
import { Connection } from 'typeorm'
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
  constructor(private connection: Connection) {}

  // Creates a new template
  async createTemplate(
    author: User,
    _data: CreateTemplateDto,
  ): Promise<CreateTemplateResponseDto> {
    const { name, body } = _data

    return this.connection.transaction(async (manager) => {
      // Create template
      const template = manager.create(Template, {
        name,
        author,
        status: TemplateStatus.Public,
      })
      await manager.save(template)

      // Create template version
      const templateVersion = manager.create(TemplateVersion, {
        template,
        editor: author,
        version: 1, // new template, first version
        body,
        paramsRequired: [], // TODO fix once templating service is implemented
      })
      await manager.save(templateVersion)

      // Add author as an editor and issuer
      const editor = manager.create(Editor, {
        template,
        user: author,
      })
      await manager.save(editor)

      const issuer = manager.create(Issuer, {
        template,
        user: author,
      })
      await manager.save(issuer)

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
    const template = await this.connection.manager.findOne(Template, {
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
      this.connection.manager,
      _templateId,
    )
    if (!isAllowed) {
      throw new ForbiddenException()
    }

    // Find latest template version
    const templateVersion = await this.connection.manager.findOne(
      TemplateVersion,
      {
        where: {
          template,
        },
        order: {
          version: 'DESC',
        },
        relations: ['editor'],
      },
    )
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
