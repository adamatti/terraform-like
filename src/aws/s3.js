"use strict";

const _ = require("lodash");
const config = require("../config");
const S3 = require('aws-sdk/clients/s3');
const s3Options = {
    endpoint: config.s3.endpoint,
    s3ForcePathStyle: true
};
const s3 = new S3(s3Options);

const subscribe = async (bucketName, queue) => {
    const response = await s3.putBucketNotificationConfiguration({
        Bucket: bucketName,
        NotificationConfiguration: {
            QueueConfigurations: [
                {
                    QueueArn: queue.arn,
                    Events:[
                        "s3:ObjectCreated:*",
                        "s3:ObjectRemoved:*",
                        "s3:ObjectRestore:*"
                    ]
                }
            ],
        }
    }).promise();
    console.log("S3 subscription created");
}

const createBucket = async (bucketName, queue) =>{
    const createResponse = await s3.createBucket({Bucket: bucketName}).promise(); 
    console.log("Bucket created:", bucketName);  

    if (queue) {
        await subscribe(bucketName, queue);
    }

}

module.exports = {
    createBucket
}