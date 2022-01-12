import { Test, TestingModule } from '@nestjs/testing'
import { MemosController } from './memos.controller'
import { MemosService } from './memos.service'
import { ConfigModule } from '../config/config.module'

describe('MemosController', () => {
  let controller: MemosController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [MemosController],
      providers: [MemosService],
    }).compile()

    controller = module.get<MemosController>(MemosController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
