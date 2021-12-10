'use strict';

const config = require('../config');
const logger = require('../logger');
const SNS = require('aws-sdk/clients/sns');
const snsOptions = {
  region: config.sqs.region,
  endpoint: config.sqs.endpoint,
};
const sns = new SNS(snsOptions);

const subscribe = async (topic, queue, args) => {
  args = args || {};
  const RawMessageDelivery = args.RawMessageDelivery || 'true';

  const response = await sns.subscribe({
    Protocol: 'sqs',
    TopicArn: topic.TopicArn,
    Endpoint: queue.url,
    Attributes: {
      RawMessageDelivery,
    },
    ReturnSubscriptionArn: true,
  }).promise();
  logger.info(`Subscription created [arn: ${response.SubscriptionArn}, queue: ${queue.name}]`);
};

const deleteTopic = async (topicName) => {
  try {
    const TopicArn = `arn:aws:sns:us-east-1:000000000000:${topicName}`;
    await sns.deleteTopic({TopicArn}).promise();
    logger.warn(`Topic deleted [name: ${topicName}]`);
  } catch (error) {
    // ignore
  }
};

const createTopic = async (topicName, queue, args) => {
  args = args || {};
  await deleteTopic(topicName);
  const topic = await sns.createTopic({Name: topicName}).promise();
  logger.info(`Topic created [name: ${topicName}, arn: ${topic.TopicArn}]`);

  if (queue) {
    const queues = Array.isArray(queue) ? queue : [queue];
    for await (const q of queues) {
      await subscribe(topic, q, args);
    }
  }
  return {
    arn: topic.TopicArn,
  };
};

module.exports = {
  createTopic,
};
