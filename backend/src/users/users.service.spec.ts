import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Template, TemplateVersion, Editor, Issuer } from 'database/entities'
import { MemosService } from 'memos/memos.service'
import { TemplatesService } from 'templates/templates.service'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService
  const mockRepository = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // TODO fix: external services should be imports but nest seems unable to resolve the deps (?)
      providers: [
        UsersService,
        MemosService,
        TemplatesService,
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

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
