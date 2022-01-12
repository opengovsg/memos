import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '../config/config.service'
import { PermissionsService } from './permissions.service'
import { TemplatesService } from './templates.service'

describe('TemplatesService', () => {
  let service: TemplatesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplatesService, PermissionsService, ConfigService],
    }).compile()

    service = module.get<TemplatesService>(TemplatesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
