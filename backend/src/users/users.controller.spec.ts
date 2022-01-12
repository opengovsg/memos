import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '../config/config.module'
import { UsersController } from './users.controller'
import { MemosModule } from 'memos/memos.module'
import { TemplatesModule } from 'templates/templates.module'
import { UsersService } from './users.service'

describe('UsersController', () => {
  let controller: UsersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, MemosModule, TemplatesModule],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
