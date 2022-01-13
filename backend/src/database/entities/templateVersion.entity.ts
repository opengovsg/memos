import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { User } from '.'
import { BaseEntity } from './base.entity'
import { Template } from './template.entity'

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
    type: 'json',
  })
  paramsRequired!: Record<string, string>

  // Defaults to true because a new version should, by definition, be the latest
  @Column({ default: true })
  isLatestVersion!: boolean
}
