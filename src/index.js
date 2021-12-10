'use strict';

const {createBucket, createQueue, createTopic, createTable} = require('./aws');
const foxSpecific = require('./fox');

const main = async ()=>{
  console.log('Started');
  await createQueue('new-queue-dlq');

  const queueS3 = await createQueue('new-queue-s3');
  await createBucket('new-bucket', queueS3);

  const queueTopic = await createQueue('new-queue-topic');
  await createTopic('new-topic', queueTopic);

  const queueTopicFull = await createQueue('new-queue-topic-full');
  await createTopic('new-topic-full', queueTopicFull, {RawMessageDelivery: 'false'});

  await createTopic('new-topic-ignore');

  await createTable('new-table', 'id');
  await foxSpecific();
};

main();
