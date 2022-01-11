import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  CreateTemplateDto,
  CreateTemplateResponseDto,
  UpdateTemplateDto,
  UpdateTemplateResponseDto,
} from './dto'

import { TemplatesService } from './templates.service'

@Controller('templates')
@ApiTags('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}
  /**
   * Create a new template
   */
  @Post()
  @ApiResponse({ type: CreateTemplateResponseDto })
  async createTemplate(
    @Body() _createTemplateDto: CreateTemplateDto,
  ): Promise<void> {
    await this.templatesService.createTemplate()
  }
  /**
   * Get the latest version of a template by id
   */
  @Get(':id')
  async getTemplate(@Param('id') _templateId: number): Promise<void> {
    await this.templatesService.getTemplate()
  }
  /**
   * Create a new version of a template by id
   */
  @Put(':id')
  @ApiResponse({ type: UpdateTemplateResponseDto })
  async updateTemplate(
    @Param('id') _templateId: number,
    @Body() _updateTemplateDto: UpdateTemplateDto,
  ): Promise<void> {
    await this.templatesService.updateTemplate()
  }
  /**
   * Delete all versions of a template by id
   */
  @Delete(':id')
  async deleteTemplate(@Param('id') _templateId: number): Promise<void> {
    await this.templatesService.deleteTemplate()
  }
}
