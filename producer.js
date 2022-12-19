const { Kafka } = require("kafkajs");
require("dotenv").config();

// console.table([['server', process.env.BOOTSTRAP],['key',process.env.KEY
// ],['secret', process.env.SECRET]])

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.BOOTSTRAP],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: process.env.KEY,
    password: process.env.SECRET,
  },
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello KafkaJS user!" }],
  });

  await producer.disconnect();
};

run().catch((e) =>
  kafka.logger().error(`[example/producer] ${e.message}`, { stack: e.stack })
);
