import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    unique: true,
  })
  email!: string

  @Column({
    nullable: true,
  })
  apiKeyHash!: string

  // @Column({ default: {} })
  // scopes?: Record<string, string>
}
