import { Module } from '@nestjs/common'
import { ConfigModule } from 'config/config.module'
import { MemosController } from './memos.controller'
import { MemosService } from './memos.service'
@Module({
  imports: [ConfigModule],
  controllers: [MemosController],
  providers: [MemosService],
  exports: [MemosService],
})
export class MemosModule {}
