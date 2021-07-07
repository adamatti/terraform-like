"use strict";

const config = require("../config");
const Dynamo = require('aws-sdk/clients/dynamodb');
const dynamo = new Dynamo({
    region: config.dynamo.region,
    endpoint: config.dynamo.endpoint,
});

const createTable = async (tableName, key) => {
    try {
        await dynamo.deleteTable({TableName: tableName}).promise();
        console.log("Table deleted:", tableName);
    } catch (error){}

    try {
        const createResponse = await dynamo.createTable({
            TableName: tableName,
            AttributeDefinitions: [
                {
                    AttributeName: key, 
                    AttributeType: "S"
                }
            ],
            KeySchema: [
                {
                    AttributeName: key, 
                    KeyType: "HASH"
                },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5, 
                WriteCapacityUnits: 5
            }, 
        }).promise();
        console.log("Table created:",tableName);
    } catch (error) {
        if (error.code === "ResourceInUseException"){
            console.log("Table already exists:", tableName);
            return;
        }
        throw error;
    }
}

module.exports = {
    createTable
}