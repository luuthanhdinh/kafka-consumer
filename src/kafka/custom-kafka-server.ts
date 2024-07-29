import { ServerKafka } from '@nestjs/microservices';

export class CustomKafkaServer extends ServerKafka {
  constructor(private readonly serverConfig) {
    super(serverConfig);
  }

  async createConsumer(groupId: string) {
    const client = this.createClient();
    const consumer = client.consumer({ groupId: groupId });
    await consumer.connect();
    return consumer;
  }

  async subscribeToTopic(consumer, topic: string) {
    await consumer.subscribe({ topic, fromBeginning: false });
  }

  async addMessageHandler(
    consumer,
    topic: string,
    handler: (topic, partition, message: any) => void,
  ) {
    await this.subscribeToTopic(consumer, topic);

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        handler(topic, partition, message);
      },
    });
  }
}
