import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { SequelizeModule } from '@nestjs/sequelize'

import { AuthModule } from 'auth/auth.module'
import { HealthModule } from 'health/health.module'
import { MemosModule } from 'memos/memos.module'
import { TemplatesModule } from 'templates/templates.module'
import { UsersModule } from 'users/users.module'

const apiModules = [
  AuthModule,
  HealthModule,
  TemplatesModule,
  UsersModule,
  MemosModule,
]

@Module({
  imports: [
    ...apiModules,
    // Configure prefix for all API modules
    RouterModule.register([
      {
        path: 'api',
        children: apiModules,
      },
    ]),
    SequelizeModule.forRoot({
      dialect: 'sqlite', // TO-DO: change to production database dialect
      autoLoadModels: true, // TO-DO: remove in production
      synchronize: true, // TO-DO: remove in production
    }),
  ],
})
export class ApiModule {}
