import { Injectable } from '@nestjs/common';
import { Config } from './types/config.types';

@Injectable()
export class ConfigService {
  private kafkaConfigs: Config[] = [];

  async fetchKafkaConfigs() {
    // return new promise wait for 2 seconds
    await new Promise((resolve) => {
      setTimeout(() => {
        this.kafkaConfigs = [
          {
            KafkaBootstrapServer: 'localhost:9092',
            KafkaConsumerGroupId: 'consumer-1',
            KafkaTopicName: 'topic-1',
          },
          {
            KafkaBootstrapServer: 'localhost:9092',
            KafkaConsumerGroupId: 'consumer-2',
            KafkaTopicName: 'topic-2',
          },
        ];
        resolve(true);
      }, 2000);
    });
  }

  getKafkaConfigs() {
    return this.kafkaConfigs;
  }
}
