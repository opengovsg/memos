import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaHealthIndicator } from './prisma.health'

@Module({
  providers: [PrismaService, PrismaHealthIndicator],
  exports: [PrismaHealthIndicator],
})
export class PrismaModule {}
