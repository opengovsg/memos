import { TemplateBlock, TemplateStatus } from 'types'

export class GetTemplateResponseDto {
  id!: number
  version!: number
  status!: TemplateStatus
  author!: number
  editor!: number

  name!: string
  body!: TemplateBlock[]
  paramsRequired!: string[]
}

export class GetTemplateMetaResponseDto {
  id!: number
  status!: TemplateStatus
  author!: number
  editor!: number

  name!: string
  updatedAt!: Date
}
