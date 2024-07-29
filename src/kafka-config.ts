import { KafkaOptions, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { Config } from './types/config.types';

export const createKafkaOptions = (config: Config): KafkaOptions => {
  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: `consumer-${uuidv4()}`,
        brokers: [config.KafkaBootstrapServer],
      },
      consumer: {
        groupId: config.KafkaConsumerGroupId,
      },
    },
  };
};
