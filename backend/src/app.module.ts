import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { ConfigModule as NestConfig } from '@nestjs/config'
import { HelmetMiddleware } from 'middlewares/helmet.middleware'
import { SessionMiddleware } from 'middlewares/session.middleware'
import { ConfigModule } from 'config/config.module'
import { AuthModule } from 'auth/auth.module'
import { OtpModule } from 'otp/otp.module'
import { MailerModule } from 'mailer/mailer.module'
import { TerminusModule } from '@nestjs/terminus'
import { HealthModule } from './health/health.module'
import { PrismaModule } from 'database/prisma.module'

@Module({
  imports: [
    NestConfig.forRoot(),
    ConfigModule,
    OtpModule,
    MailerModule,
    AuthModule,
    TerminusModule,
    HealthModule,
    PrismaModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // Apply global middlewares
    consumer.apply(HelmetMiddleware, SessionMiddleware).forRoutes('*')
  }
}
