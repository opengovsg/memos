import { Injectable } from '@nestjs/common'
import { TemplatesService } from 'templates/templates.service'
import { MemosService } from 'memos/memos.service'
import { GetTemplateMetaResponseDto } from 'templates/dto'
@Injectable()
export class UsersService {
  constructor(
    private memosService: MemosService,
    private templatesService: TemplatesService,
  ) {}
  async listMemos(): Promise<void> {
    this.memosService.listMemosForUser()
  }
  async listTemplates(userId: number): Promise<GetTemplateMetaResponseDto[]> {
    const result = this.templatesService.listTemplatesForUser(userId)
    return result
  }
}
