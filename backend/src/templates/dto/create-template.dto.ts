import { TemplateBlock } from '../../types'

export class CreateTemplateDto {
  name!: string
  body!: TemplateBlock[]
}

export class CreateTemplateResponseDto {
  id!: number // template.id, not template_version.id
  version!: number // template_version.version
}
