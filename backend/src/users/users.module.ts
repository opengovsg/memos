import { Module } from '@nestjs/common'
import { ConfigModule } from 'config/config.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
