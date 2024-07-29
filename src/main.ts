import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const logger = new Logger('App Bootstrap');

  logger.log('Fetching Kafka Configs...');
  await configService.fetchKafkaConfigs();

  await app.listen(3000);
}
bootstrap();
