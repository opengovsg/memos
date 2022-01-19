import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Template, TemplateVersion, Editor, Issuer } from 'database/entities'
import { PermissionsService } from './permissions.service'
import { TemplatesService } from './templates.service'

describe('TemplatesService', () => {
  let service: TemplatesService
  const mockRepository = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<TemplatesService>(TemplatesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
