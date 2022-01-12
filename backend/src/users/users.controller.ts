import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ListMemosForUserDto, ListTemplatesForUserResponseDto } from './dto'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * List templates that the user has access to
   */
  @Get(':id/templates')
  @ApiResponse({ type: ListTemplatesForUserResponseDto })
  async listTemplates(@Param('id') _userId: number): Promise<void> {
    await this.usersService.listTemplates()
  }
  /**
   * List memos that the user has access to
   */
  @Get(':id/memos')
  @ApiResponse({ type: ListMemosForUserDto })
  async listMemos(
    @Param('id') _userId: number,
    @Query('query') _query: ListMemosForUserDto,
  ): Promise<void> {
    await this.usersService.listMemos()
  }
}
