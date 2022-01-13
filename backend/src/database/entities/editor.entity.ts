import { Entity, JoinColumn, OneToOne } from 'typeorm'
import { User } from '.'
import { BaseEntity } from './base.entity'
import { Template } from './template.entity'

@Entity({ name: 'editors' })
export class Editor extends BaseEntity {
  @OneToOne(() => Template, { nullable: false })
  @JoinColumn({ name: 'template' })
  template!: Template

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user' })
  user!: User
}
