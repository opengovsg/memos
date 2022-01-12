import { Test, TestingModule } from '@nestjs/testing'
import { TemplatesController } from './templates.controller'
import { TemplatesService } from './templates.service'
import { ConfigModule } from '../config/config.module'
import { PermissionsService } from './permissions.service'

describe('TemplatesController', () => {
  let controller: TemplatesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [TemplatesController],
      providers: [TemplatesService, PermissionsService],
    }).compile()

    controller = module.get<TemplatesController>(TemplatesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
