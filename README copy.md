cd C:\kafka

# Start server

.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
.\bin\windows\kafka-server-start.bat .\config\server.properties

# Topic

.\bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092
.\bin\windows\kafka-topics.bat --delete --topic customer --bootstrap-server localhost:9092
.\bin\windows\kafka-topics.bat --create --topic customer --bootstrap-server localhost:9092 --partitions 10 --replication-factor 1

# Consumer

.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic customer --group customer-group --from-beginning

# Subscriber

.\bin\windows\kafka-console-producer.bat --broker-list localhost:9092 --topic customer

# Example:

.\bin\windows\kafka-topics.bat --create --topic topic-1 --bootstrap-server localhost:9092 --partitions 10 --replication-factor 1
.\bin\windows\kafka-topics.bat --create --topic topic-2 --bootstrap-server localhost:9092 --partitions 10 --replication-factor 1
.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic topic-1 --from-beginning
.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic topic-2 --from-beginning
.\bin\windows\kafka-console-producer.bat --broker-list localhost:9092 --topic topic-1
.\bin\windows\kafka-console-producer.bat --broker-list localhost:9092 --topic topic-2
