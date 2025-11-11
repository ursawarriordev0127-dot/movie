import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { API_PREFIX } from './common/constants';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // Global prefix
    app.setGlobalPrefix(API_PREFIX);

    // CORS
    app.enableCors({
      origin: configService.get<string>('FRONTEND_URL', 'http://localhost:3000'),
      credentials: true,
    });

    // Global pipes
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // Global filters
    app.useGlobalFilters(new HttpExceptionFilter());

    // Global interceptors
    app.useGlobalInterceptors(new TransformInterceptor());

    // Ensure PORT is explicitly set to 3001 if not provided
    // Check both .env file and system environment variable
    const envPort = configService.get<string>('PORT');
    const systemPort = process.env.PORT;
    
    // Warn if system env var differs from .env file
    if (systemPort && envPort && systemPort !== envPort) {
      logger.warn(`⚠️  System PORT=${systemPort} conflicts with .env PORT=${envPort}. Using .env value.`);
    }
    
    let port = envPort ? parseInt(envPort, 10) : 3001;
    
    if (!port || isNaN(port) || port <= 0) {
      logger.warn(`Invalid PORT value: ${envPort}, defaulting to 3001`);
      port = 3001;
    }
    
    // Force port 3001 if somehow it's still 3000
    if (port === 3000) {
      logger.warn('⚠️  Port 3000 detected, forcing to 3001 to avoid conflict with frontend');
      port = 3001;
    }
    
    logger.log(`PORT from config: ${envPort || 'not set (using default 3001)'}`);
    logger.log(`System PORT env var: ${systemPort || 'not set'}`);
    logger.log(`Attempting to start on port: ${port}`);
    await app.listen(port);
    logger.log(`Application is running on: http://localhost:${port}/${API_PREFIX}`);
  } catch (error) {
    logger.error('Failed to start application', error);
    
    const errorMessage = error?.message || '';
    const errorStack = error?.stack || '';
    const hasEACCES = errorMessage.includes('EACCES') || errorStack.includes('EACCES');
    const hasEADDRINUSE = errorMessage.includes('EADDRINUSE') || errorStack.includes('EADDRINUSE');
    
    if (hasEADDRINUSE) {
      logger.error('');
      logger.error('═══════════════════════════════════════════════════════════');
      logger.error('  Port In Use Error (EADDRINUSE)');
      logger.error('═══════════════════════════════════════════════════════════');
      logger.error('');
      logger.error('Possible causes:');
      logger.error('  1. Another application is already using the port');
      logger.error('  2. A previous instance did not shut down cleanly');
      logger.error('');
      logger.error('Troubleshooting steps:');
      logger.error('  Windows PowerShell:');
      logger.error('    1. Find the process: netstat -ano | findstr :3000');
      logger.error('    2. Kill the process: taskkill /PID <PID> /F');
      logger.error('  Or use a different port by setting PORT=3002 in .env');
      logger.error('');
      logger.error('═══════════════════════════════════════════════════════════');
    } else if (hasEACCES) {
      logger.error('');
      logger.error('═══════════════════════════════════════════════════════════');
      logger.error('  Database Connection Error (EACCES - Permission Denied)');
      logger.error('═══════════════════════════════════════════════════════════');
      logger.error('');
      logger.error('Possible causes:');
      logger.error('  1. PostgreSQL service is not running');
      logger.error('  2. Database does not exist');
      logger.error('  3. Incorrect connection credentials');
      logger.error('  4. Port is blocked or in use');
      logger.error('');
      logger.error('Troubleshooting steps:');
      logger.error('  1. Check if PostgreSQL is running:');
      logger.error('     PowerShell: Get-Service postgresql*');
      logger.error('  2. Start PostgreSQL service:');
      logger.error('     PowerShell: Start-Service -Name "postgresql-x64-*"');
      logger.error('  3. Create the database:');
      logger.error('     createdb -U postgres movie_app');
      logger.error('  4. Run diagnostic script:');
      logger.error('     PowerShell: .\\check-db.ps1');
      logger.error('  5. Verify .env file has correct DB settings');
      logger.error('');
      logger.error('═══════════════════════════════════════════════════════════');
    }
    
    process.exit(1);
  }
}
bootstrap();

