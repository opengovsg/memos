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
  @Get(':userId/templates')
  @ApiResponse({ type: ListTemplatesForUserResponseDto })
  async listTemplates(@Param('userId') _userId: number): Promise<void> {
    await this.usersService.listTemplates()
  }
  /**
   * List memos that the user has access to
   */
  @Get(':userId/memos')
  @ApiResponse({ type: ListMemosForUserDto })
  async listMemos(
    @Param('userId') _userId: number,
    @Query('query') _query: ListMemosForUserDto,
  ): Promise<void> {
    await this.usersService.listMemos()
  }
}
