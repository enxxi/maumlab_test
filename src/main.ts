import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { winstonLogger } from './utils/logger/winston.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: winstonLogger });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 4000;
  await app.listen(port);
}
bootstrap();
