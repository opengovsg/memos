import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  AddPermissionDto,
  AddPermissionResponseDto,
  CreateTemplateDto,
  CreateTemplateResponseDto,
  DeletePermissionDto,
  DeletePermissionResponseDto,
  ListPermissionsDto,
  ListPermissionsResponseDto,
  UpdateTemplateDto,
  UpdateTemplateResponseDto,
} from './dto'

import { PermissionsService } from './permissions.service'
import { TemplatesService } from './templates.service'

@Controller('templates')
@ApiTags('templates')
export class TemplatesController {
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly permissionsService: PermissionsService,
  ) {}
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

  /**
   * Add permission to template
   */
  @Post(':id/permissions')
  @ApiResponse({ type: AddPermissionResponseDto })
  async addPermission(
    @Param('id') _templateId: number,
    @Body() _addPermissionDto: AddPermissionDto,
  ): Promise<void> {
    await this.permissionsService.addPermission()
  }

  /**
   * List permissions for template
   */
  @Get(':id/permissions')
  @ApiResponse({ type: ListPermissionsResponseDto })
  async listPermission(
    @Param('id') _templateId: number,
    @Body() _listPermissionsDto: ListPermissionsDto,
  ): Promise<void> {
    await this.permissionsService.listPermissions()
  }

  /**
   * Delete permission from template
   */
  @Post(':id/permissions/delete')
  @ApiResponse({ type: DeletePermissionResponseDto })
  async deletePermission(
    @Param('id') _templateId: number,
    @Body() _deletePermissionDto: DeletePermissionDto,
  ): Promise<void> {
    await this.permissionsService.deletePermission()
  }
}
