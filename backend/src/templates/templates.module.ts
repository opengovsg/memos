import { Module } from '@nestjs/common'
import { ConfigModule } from 'config/config.module'
import { PermissionsService } from './permissions.service'
import { TemplatesController } from './templates.controller'
import { TemplatesService } from './templates.service'
@Module({
  imports: [ConfigModule],
  controllers: [TemplatesController],
  providers: [PermissionsService, TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
