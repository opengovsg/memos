import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus'
import { PrismaHealthIndicator } from 'database/prisma.health'
import { ConfigService } from '../config/config.service'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private config: ConfigService,
    // Refer to https://github.com/nestjs/terminus/blob/master/sample/ for
    // examples of how to add other services/databases to healthcheck.
    private db: PrismaHealthIndicator,
    private memory: MemoryHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      async () => this.db.isHealthy('database'),
      async () =>
        this.memory.checkHeap(
          'memory_heap',
          this.config.get('health.heapSizeThreshold')
        ),
      async () =>
        this.memory.checkRSS(
          'memory_rss',
          this.config.get('health.rssThreshold')
        ),
    ])
  }
}
