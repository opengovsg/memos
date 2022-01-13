import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm'
import { User } from '.'
import { BaseEntity } from './base.entity'
import { TemplateVersion } from './templateVersion.entity'

// TODO: Abstract constants
enum UinType {
  'NRIC' = 'NRIC',
}

@Entity({ name: 'memos' })
export class Memo extends BaseEntity {
  @OneToOne(() => TemplateVersion, { nullable: false })
  @JoinColumn({ name: 'template_version' })
  templateVersion!: TemplateVersion

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'issuer' })
  issuer!: User

  @Column()
  uin!: string

  @Column()
  uinType!: UinType

  @Column()
  @Index({ unique: true }) // optimize for queries
  slug!: string

  @Column({ type: 'json' })
  params!: Record<string, string>

  @Column({ nullable: true })
  expiresAt?: Date

  @Column({ default: false })
  isViewed!: boolean

  @Column({ default: false })
  isVoid!: boolean

  @Column({ nullable: true })
  voidReason?: string
}
