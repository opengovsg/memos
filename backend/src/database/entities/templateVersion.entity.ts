import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { BaseEntity, Template, User } from '.'

@Entity({ name: 'template_versions' })
export class TemplateVersion extends BaseEntity {
  @OneToOne(() => Template, { nullable: false })
  @JoinColumn({ name: 'template' })
  template!: Template

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'editor' })
  editor!: User

  @Column()
  body!: string

  @Column({
    type: 'jsonb',
  })
  paramsRequired!: Record<string, string>

  // Defaults to true because a new version should, by definition, be the latest
  @Column({ default: true })
  isLatestVersion!: boolean

  @Column()
  version!: number
}
