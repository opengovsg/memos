import { Entity, Column } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({
    unique: true,
  })
  email!: string

  @Column({
    nullable: true,
  })
  apiKeyHash?: string

  @Column({
    type: 'json',
    nullable: true,
  })
  apiKeyScopes?: string[]
}
