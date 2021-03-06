'use strict';

const config = require('../config');
const logger = require('../logger');
const Dynamo = require('aws-sdk/clients/dynamodb');
const dynamo = new Dynamo({
  region: config.dynamo.region,
  endpoint: config.dynamo.endpoint,
});

const defineSecondaryIndexes = (tableDefinition, secondaryIndexes) => {
  const GlobalSecondaryIndexes = (secondaryIndexes || []).map((it) => {
    return {
      IndexName: `${it}-index`,
      KeySchema: [
        {
          AttributeName: it,
          KeyType: 'HASH',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };
  });
  secondaryIndexes.forEach((AttributeName) => {
    tableDefinition.AttributeDefinitions.push({
      AttributeName,
      AttributeType: 'S',
    });
  });
  tableDefinition.GlobalSecondaryIndexes = GlobalSecondaryIndexes;
};

const createTable = async (tableName, key, options) => {
  const {secondaryIndexes} = (options || {});

  try {
    await dynamo.deleteTable({TableName: tableName}).promise();
    logger.warn(`Table deleted [name: ${tableName}]`);
  } catch (error) {}

  try {
    const tableDefinition = {
      TableName: tableName,
      AttributeDefinitions: [
        {
          AttributeName: key,
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: key,
          KeyType: 'HASH',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };
    if (secondaryIndexes) {
      defineSecondaryIndexes(tableDefinition, secondaryIndexes);
    }

    await dynamo.createTable(tableDefinition).promise();
    logger.info(`Table created [name: ${tableName}]`);
  } catch (error) {
    if (error.code === 'ResourceInUseException') {
      logger.warn('Table already exists:', tableName);
      return;
    }
    throw error;
  }
};

module.exports = {
  createTable,
};
