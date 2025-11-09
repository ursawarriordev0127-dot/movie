import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { join } from 'path';

const logger = new Logger('DatabaseConfig');

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const useSqlite = configService.get<string>('USE_SQLITE', 'false').toLowerCase() === 'true';
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');

  // Use SQLite if explicitly enabled (useful when PostgreSQL is not available)
  if (useSqlite) {
    const dbPath = join(__dirname, '..', '..', 'database.sqlite');
    logger.warn(`Using SQLite database at ${dbPath}`);
    logger.warn('Note: For production, use PostgreSQL by setting USE_SQLITE=false');

    return {
      type: 'better-sqlite3',
      database: dbPath,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: nodeEnv === 'development',
    };
  }

  // PostgreSQL configuration
  const host = configService.get<string>('DB_HOST', 'localhost');
  const port = configService.get<number>('DB_PORT', 5432);
  const username = configService.get<string>('DB_USERNAME', 'postgres');
  const database = configService.get<string>('DB_NAME', 'movie_app');

  logger.log(`Connecting to PostgreSQL at ${host}:${port}/${database} as ${username}`);

  return {
    type: 'postgres',
    host,
    port,
    username,
    password: configService.get<string>('DB_PASSWORD', 'postgres'),
    database,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: nodeEnv !== 'production',
    logging: nodeEnv === 'development',
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    migrationsRun: false,
    retryAttempts: 5,
    retryDelay: 5000,
    extra: {
      max: 10,
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
    },
  };
};

