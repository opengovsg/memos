import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
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
import { AuthGuard } from 'auth/auth.guard'
import { SessionData } from 'express-session'

@Controller('templates')
@ApiTags('templates')
@UseGuards(AuthGuard)
export class TemplatesController {
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly permissionsService: PermissionsService,
  ) {}

  /**
   * Create a new template
   */
  @Post()
  @ApiCreatedResponse({ type: CreateTemplateResponseDto })
  async createTemplate(
    @Session() session: SessionData,
    @Body() createTemplateDto: CreateTemplateDto,
  ): Promise<CreateTemplateResponseDto> {
    const result = await this.templatesService.createTemplate(
      session.user,
      createTemplateDto,
    )
    return result
  }

  /**
   * Get the latest version of a template by id
   */
  @Get(':id')
  async getTemplate(
    @Res() res: Response,
    @Param('id') templateId: number,
  ): Promise<void> {
    const result = await this.templatesService.getTemplate(templateId)
    res.json(result)
  }
  /**
   * Create a new version of a template by id
   */
  @Put(':id')
  @ApiResponse({ type: UpdateTemplateResponseDto })
  async updateTemplate(
    @Res() res: Response,
    @Param('id') templateId: number,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ): Promise<void> {
    const result = await this.templatesService.updateTemplate({
      ...updateTemplateDto,
      templateId,
    })
    res.json(result)
  }
  /**
   * Hide all versions of a template by id such that the template is no longer displayed
   * and cannot be used for issuance
   */
  @Post(':id/hide')
  async hideTemplate(@Param('id') templateId: number): Promise<void> {
    await this.templatesService.hideTemplate(templateId)
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
