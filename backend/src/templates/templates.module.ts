import { Module } from '@nestjs/common'
import { ConfigModule } from 'config/config.module'
import { TemplatesController } from './templates.controller'
import { TemplatesService } from './templates.service'
@Module({
  imports: [ConfigModule],
  controllers: [TemplatesController],
  providers: [TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
