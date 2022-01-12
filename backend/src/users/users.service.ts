import { Injectable } from '@nestjs/common'
import { TemplatesService } from 'templates/templates.service'
import { MemosService } from 'memos/memos.service'
@Injectable()
export class UsersService {
  constructor(
    private memosService: MemosService,
    private templatesService: TemplatesService,
  ) {}
  async listMemos(): Promise<void> {
    this.memosService.listMemosForUser()
  }
  async listTemplates(): Promise<void> {
    this.templatesService.listTemplatesForUser()
  }
}
