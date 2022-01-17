import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { TemplateStatus } from '../../types'
import { BaseEntity, User } from '.'

@Entity({ name: 'templates' })
export class Template extends BaseEntity {
  @Column()
  name!: string

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'author' })
  author!: User

  @Column()
  status!: TemplateStatus
}
