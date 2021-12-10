'use strict';

const {createBucket} = require('./s3');
const {createQueue} = require('./sqs');
const {createTopic} = require('./sns');
const {createTable} = require('./dynamo');

module.exports = {
  createBucket,
  createQueue,
  createTopic,
  createTable,
};
