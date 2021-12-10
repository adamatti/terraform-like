'use strict';

const config = require('../config');
const logger = require('../logger');
const SQS = require('aws-sdk/clients/sqs');
const sqsOptions = {
  region: config.sqs.region,
  endpoint: config.sqs.endpoint,
};
const sqs = new SQS(sqsOptions);

const createQueue = async (queueName) => {
  const createResponse = await sqs.createQueue({QueueName: queueName}).promise();
  logger.info(`Queue created [name: ${queueName}, url: ${createResponse.QueueUrl}]`);

  const queue = await sqs.getQueueAttributes({QueueUrl: createResponse.QueueUrl}).promise();
  return {
    name: queueName,
    url: createResponse.QueueUrl,
    arn: queue.Attributes.QueueArn,
  };
};

module.exports = {
  createQueue,
};
