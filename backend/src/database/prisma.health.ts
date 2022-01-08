import { Injectable } from '@nestjs/common'
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus'
import { PrismaService } from './prisma.service'
@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
  constructor(private readonly prisma: PrismaService) {
    super()
  }
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const ping = await this.prisma.$queryRaw`SELECT 1`
    const result = this.getStatus(key, !!ping)
    if (ping) {
      return result
    }
    throw new HealthCheckError('Prisma check failed', result)
  }
}
