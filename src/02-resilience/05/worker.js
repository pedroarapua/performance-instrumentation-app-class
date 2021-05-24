// amqplib library
const amqplib = require('amqplib');

// rabbitmq queue name
const QUEUENAME = 'tasks';

// function to consume message in rabbitmq
async function consume() {
  // create client
  const amqpblibClient = await amqplib.connect('amqp://teste:teste@localhost');
  // create channel
  const channel = await amqpblibClient.createChannel();
  // create queue if it doesn't exist
  await channel.assertQueue(QUEUENAME);
  // get message 
  await channel.consume(QUEUENAME, (msg) => {
    if(msg !== null) {
      // add logic to notify the owner of application server
      console.log(msg.content.toString());
      channel.ack(msg);
    }
  });
}

async function execute () {
  try {
    await consume()
  } catch(err) {
    console.error('Error to consume messages in RabbitMQ => ', err);
  }
}

execute();