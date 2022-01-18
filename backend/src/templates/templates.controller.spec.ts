import { Test, TestingModule } from '@nestjs/testing'
import { TemplatesController } from './templates.controller'
import { TemplatesService } from './templates.service'
import { PermissionsService } from './permissions.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Editor, Issuer, Template, TemplateVersion } from 'database/entities'

describe('TemplatesController', () => {
  let controller: TemplatesController
  const mockRepository = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplatesController],
      providers: [
        TemplatesService,
        PermissionsService,
        {
          provide: getRepositoryToken(Template),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(TemplateVersion),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Editor),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Issuer),
          useValue: mockRepository,
        },
      ],
    }).compile()

    controller = module.get<TemplatesController>(TemplatesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
