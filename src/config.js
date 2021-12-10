'use strict';

const config = {
  logLevel: process.env.LOG_LEVEL || 'debug',
  sqs: {
    region: process.env.AWS_SQS_REGION || process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.AWS_SQS_ENDPOINT,
  },
  sns: {
    region: process.env.AWS_SNS_REGION || process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.AWS_SNS_ENDPOINT,
  },
  s3: {
    endpoint: process.env.AWS_S3_ENDPOINT,
  },
  dynamo: {
    region: process.env.AWS_DYNAMO_DB_REGION || process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.AWS_DYNAMO_DB_ENDPOINT,
  },
};

module.exports = config;
