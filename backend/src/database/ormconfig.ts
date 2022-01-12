import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export default {
  type: 'sqlite',
  name: 'default',
  database: 'db.sqlite3',
  synchronize: false, // do not automatically sync entities
  // js for runtime, ts for typeorm cli
  entities: [join(__dirname, 'entities', '*.entity{.js,.ts}')],
  migrations: [join(__dirname, 'migrations', '*{.js,.ts}')],
  cli: {
    migrationsDir: join(__dirname, 'migrations'),
  },
  namingStrategy: new SnakeNamingStrategy(),
} as TypeOrmModuleOptions
