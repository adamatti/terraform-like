"use strict";

const config = require("../config");
const SNS = require('aws-sdk/clients/sns');
const snsOptions = {
    region: config.sqs.region,
    endpoint: config.sqs.endpoint,
};
const sns = new SNS(snsOptions);

const subscribe = async (topic, queue) => {
    const response = await sns.subscribe({
        Protocol: "sqs",
        TopicArn: topic.TopicArn,
        Endpoint: queue.url, 
        Attributes: {

        },
        ReturnSubscriptionArn: true
    }).promise();
    console.log("Subscription created, arn:", response.SubscriptionArn);
}

const createTopic = async (topicName, queue) => {
    const topic = await sns.createTopic({Name: topicName}).promise();    
    console.log("Topic created:",topicName,"- arn:", topic.TopicArn);
    if (queue){
        await subscribe(topic, queue);
    }
    return {
        arn: topic.TopicArn
    };
}

module.exports = {
    createTopic
}