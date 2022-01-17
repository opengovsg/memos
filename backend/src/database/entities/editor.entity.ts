import { Entity, JoinColumn, OneToOne } from 'typeorm'
import { BaseEntity, Template, User } from '.'

@Entity({ name: 'editors' })
export class Editor extends BaseEntity {
  @OneToOne(() => Template, { nullable: false })
  @JoinColumn({ name: 'template' })
  template!: Template

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user' })
  user!: User
}
