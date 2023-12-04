import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import { winstonLogger } from './config/winston.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = winstonLogger;
  app.useLogger(logger);
  const port = configService.get('PORT') || 4000;
  await app.listen(port);
}
bootstrap();
