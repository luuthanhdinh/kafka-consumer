import { Controller, OnModuleInit } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from './config.service';
import { KafkaService } from './kafka/kafka.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly kafkaConfigService: ConfigService,
    private readonly kafkaService: KafkaService,
  ) {}

  async onModuleInit() {
    const kafkaConfigs = this.kafkaConfigService.getKafkaConfigs();

    kafkaConfigs.forEach(async (config) => {
      const uuid = uuidv4();
      const serverName = `server-${uuid}`;
      const serverConfig = {
        client: {
          clientId: `consumer-${uuid}`,
          brokers: [config.KafkaBootstrapServer],
        },
      };
      this.kafkaService.addKafkaServer(serverName, serverConfig);

      const consumer = await this.kafkaService.createConsumer(
        serverName,
        config.KafkaTopicName,
      );

      await this.kafkaService.subscribeToTopic(
        serverName,
        consumer,
        config.KafkaTopicName,
        (topic, partition, message) => {
          console.log('Server Received topic:', topic);
          console.log('Server Received partition:', partition);
          console.log('Server Received message:', message.value.toString());
        },
      );
    });
  }
}
