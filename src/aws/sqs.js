"use strict";

const config = require("../config");
const SQS = require('aws-sdk/clients/sqs');
const sqsOptions = {
    region: config.sqs.region,
    endpoint: config.sqs.endpoint,
};
const sqs = new SQS(sqsOptions);

const createQueue = async (queueName) => {
    const createResponse = await sqs.createQueue({QueueName: queueName}).promise();
    console.log("Queue created:", queueName,"- url:",createResponse.QueueUrl);
    
    const queue = await sqs.getQueueAttributes({QueueUrl: createResponse.QueueUrl}).promise();
    return {
        url: createResponse.QueueUrl,
        arn: queue.Attributes.QueueArn
    };
}

module.exports = {
    createQueue
}