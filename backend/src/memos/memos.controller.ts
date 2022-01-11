import { Body, Controller, Param, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  CreateMemoDto,
  CreateMemoResponseDto,
  UploadMemosCompleteDto,
  UploadMemosCompleteResponseDto,
  UploadMemosDto,
  UploadMemosResponseDto,
  VoidMemoDto,
  VoidMemoResponseDto,
} from './dto'
import { MemosService } from './memos.service'

@Controller('memos')
@ApiTags('memos')
export class MemosController {
  constructor(private readonly memosService: MemosService) {}
  /**
   * Create a single new memo
   */
  @Post()
  @ApiResponse({ type: CreateMemoResponseDto })
  async createMemo(@Body() _createMemoDto: CreateMemoDto): Promise<void> {
    await this.memosService.createMemo()
  }
  /**
   * Void a memo by id
   */
  @Post(':memoId/void')
  @ApiResponse({ type: VoidMemoResponseDto })
  async voidMemo(
    @Param('memoId') _memoId: string,
    @Body() _voidMemoDto: VoidMemoDto,
  ): Promise<void> {
    await this.memosService.voidMemo()
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
}
