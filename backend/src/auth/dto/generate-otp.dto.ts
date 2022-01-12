import { IsEmail } from 'class-validator'

export class GenerateOtpDto {
  /**
   * Email of government officer
   * @example example@example.gov.sg
   */
  @IsEmail()
  email!: string
}
