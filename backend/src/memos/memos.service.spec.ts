import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '../config/config.service'
import { MemosService } from './memos.service'

describe('MemosService', () => {
  let service: MemosService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemosService, ConfigService],
    }).compile()

    service = module.get<MemosService>(MemosService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
