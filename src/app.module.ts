import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config.service';
import { KafkaService } from './kafka/kafka.service';

@Module({
  controllers: [AppController],
  providers: [AppService, ConfigService, KafkaService, Logger],
  exports: [ConfigService, KafkaService],
})
export class AppModule {}
