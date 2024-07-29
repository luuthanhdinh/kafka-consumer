import { Injectable, OnModuleInit } from '@nestjs/common';
import { CustomKafkaServer } from './custom-kafka-server';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafkaServers: Map<string, CustomKafkaServer> = new Map();

  async onModuleInit() {
    // Initialize any default Kafka servers here if needed
  }

  addKafkaServer(name: string, serverConfig) {
    const kafkaServer = new CustomKafkaServer(serverConfig);
    this.kafkaServers.set(name, kafkaServer);
    return kafkaServer;
  }

  async createConsumer(serverName: string, groupId: string) {
    const kafkaServer = this.kafkaServers.get(serverName);
    if (!kafkaServer) {
      throw new Error(`Kafka server ${serverName} not found`);
    }
    return await kafkaServer.createConsumer(groupId);
  }

  async subscribeToTopic(
    serverName: string,
    consumer,
    topic: string,
    handler: (topic, partition, message: any) => void,
  ) {
    const kafkaServer = this.kafkaServers.get(serverName);
    if (!kafkaServer) {
      throw new Error(`Kafka server ${serverName} not found`);
    }
    await kafkaServer.addMessageHandler(consumer, topic, handler);
  }
}
