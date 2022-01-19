import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  CreateMemoDto,
  CreateMemoResponseDto,
  UploadMemosCompleteDto,
  UploadMemosCompleteResponseDto,
  UploadMemosDto,
  UploadMemosResponseDto,
  VoidMemosDto,
  VoidMemosResponseDto,
} from './dto'
import { GetMemoResponseDto } from './dto/get-memo.dto'
import { MemosService } from './memos.service'
import { AuthGuard } from 'auth/auth.guard'
import { SessionData } from 'express-session'

@Controller('memos')
@ApiTags('memos')
@UseGuards(AuthGuard)
export class MemosController {
  constructor(private readonly memosService: MemosService) {}
  /**
   * Create a single new memo
   */
  @Post()
  @ApiResponse({ type: CreateMemoResponseDto })
  async createMemo(
    @Session() session: SessionData,
    @Body() createMemoDto: CreateMemoDto,
  ): Promise<CreateMemoResponseDto> {
    const result = await this.memosService.createMemo(
      session.user,
      createMemoDto,
    )
    return result
  }
  /**
   * Void a list of memos
   */
  @Post('void')
  @ApiResponse({ type: VoidMemosResponseDto })
  async voidMemos(@Body() _voidMemosDto: VoidMemosDto): Promise<void> {
    await this.memosService.voidMemos()
  }

  /**
   * Get a presigned url for uploading file of parameters for multiple memos
   */
  @Post('upload')
  @ApiResponse({ type: UploadMemosResponseDto })
  async uploadMemos(@Body() _uploadMemosDto: UploadMemosDto): Promise<void> {
    await this.memosService.uploadMemos()
  }
  /**
   * Indicate that the file has been uploaded
   */
  @Post('upload/complete')
  @ApiResponse({ type: UploadMemosCompleteResponseDto })
  async uploadMemosComplete(
    @Body() _uploadMemosDto: UploadMemosCompleteDto,
  ): Promise<void> {
    await this.memosService.uploadMemosComplete()
  }

  /**
   * Get memo based on slug
   */
  @Get(':slug')
  @ApiResponse({ type: GetMemoResponseDto })
  async getMemo(@Param('slug') slug: string): Promise<GetMemoResponseDto> {
    const result = await this.memosService.getMemo(slug)
    return result
  }
}
