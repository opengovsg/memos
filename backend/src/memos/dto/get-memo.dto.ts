import { IsNotEmpty } from 'class-validator'
import { User } from 'database/entities'
import { TemplateBlock } from 'types'

export class GetMemoDto {
  @IsNotEmpty()
  slug!: string
}

export class GetMemoResponseDto {
  id!: number
  issuer!: User
  slug!: string

  uin!: string
  uinType!: string

  expiresAt?: Date
  isViewed!: boolean
  isVoid!: boolean
  voidReason?: string

  body!: TemplateBlock[]
}
