"use strict";

const {createBucket,createQueue,createTopic,createTable} = require("./aws");

const main = async ()=>{
    await createQueue("new-queue-dlq");

    const queueS3 = await createQueue("new-queue-s3");
    await createBucket("new-bucket", queueS3);    

    const queueTopic = await createQueue("new-queue-topic");
    await createTopic("new-topic", queueTopic);
    await createTopic("new-topic-ignore");

    await createTable("new-table","id");
}

main ();