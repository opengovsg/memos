import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Template, TemplateVersion, Editor, Issuer } from 'database/entities'
import { MemosService } from 'memos/memos.service'
import { TemplatesService } from 'templates/templates.service'

describe('UsersController', () => {
  let controller: UsersController
  const mockRepository = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
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

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
