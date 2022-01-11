import { Injectable } from '@nestjs/common'
import {
  CreateTemplateDto,
  CreateTemplateResponseDto,
  UpdateTemplateDto,
  UpdateTemplateResponseDto,
} from './dto'

@Injectable()
export class TemplatesService {
  async createTemplate(
    _data: CreateTemplateDto,
  ): Promise<CreateTemplateResponseDto> {
    // Do something with data
    return { id: 1, version: 1 }
  }
  async updateTemplate(
    _data: UpdateTemplateDto & { templateId: number },
  ): Promise<UpdateTemplateResponseDto> {
    // Do something with data
    return { id: 1, version: 2 }
  }
  async deleteTemplate(_templateId: number): Promise<void> {
    return
  }
  async getTemplate(_templateId: number): Promise<void> {
    return
  }
  async listTemplatesForUser(): Promise<void> {
    return
  }
}
