import { IsNotEmpty, IsNotEmptyObject, IsOptional } from 'class-validator'
export class CreateMemoDto {
  @IsNotEmpty()
  templateId!: number

  @IsOptional()
  versionId?: number

  @IsNotEmptyObject()
  params!: Record<string, string>
}

export class CreateMemoResponseDto {
  slug!: string
}
