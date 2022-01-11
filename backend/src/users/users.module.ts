import { Module } from '@nestjs/common'
import { ConfigModule } from 'config/config.module'
import { MemosModule } from 'memos/memos.module'
import { TemplatesModule } from 'templates/templates.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
@Module({
  imports: [ConfigModule, MemosModule, TemplatesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
