'use strict';

const EventEmitter = require('events').EventEmitter;
const logger = require('../lib/logger');
const config = require('../config/aws');
const aws = require('aws-sdk');

aws.config.update(config);

class CreditService extends EventEmitter {
  constructor(aws) {
    super();
    this.ddb = new aws.DynamoDB();
    this.docClient = new aws.DynamoDB.DocumentClient();
  }

  init() {
    let params = {
        TableName : 'Credits',
        KeySchema: [
          { AttributeName: 'userId', KeyType: 'HASH' },// Partition key
          { AttributeName: 'count', KeyType: 'RANGE' },// Sort key
        ],
        AttributeDefinitions: [
          { AttributeName: 'userId', AttributeType: 'S' },
          { AttributeName: 'count', AttributeType: 'N' }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10
        }
    };
    return new Promise((resolve, reject) => {
      this.ddb.createTable(params, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  destroy() {
    let params = {
      TableName : 'Credits',
    };
    return new Promise((resolve, reject) => {
      this.ddb.deleteTable(params, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  read(userId) {
    const params = {
      TableName: 'Credits',
      Key: {
        'userId': userId
      }
    };
    return new Promise((resolve, reject) => {
      this.docClient.get(params, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  increment(userId, amount) {
    if (typeof userId === 'undefined') {
      return Promise.reject('Missing userId');
    }

    const params = {
      TableName: 'Credits',
      Key: {
        'userId': userId
      },
      UpdateExpression: 'set info.count += :amount',
      ExpressionAttributeValues: {
        ':amount': amount,
      },
      ReturnValues: 'UPDATED_NEW'
    };
    return new Promise((resolve, reject) => {
      this.docClient.update(params, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  set(userId, amount) {
    if (typeof userId === 'undefined') {
      return Promise.reject('Missing userId');
    }

    const params = {
      TableName: 'Credits',
      Key: {
        'userId': userId
      },
      UpdateExpression: 'set info.count = :amount',
      ExpressionAttributeValues: {
        ':amount': amount,
      },
      ReturnValues: 'UPDATED_NEW'
    };
    return new Promise((resolve, reject) => {
      this.docClient.update(params, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  decrement(userId, amount = 1) {
    if (typeof userId === 'undefined') {
      return Promise.reject('Missing userId');
    }
    const params = {
      TableName: 'Credits',
      Key: {
        'userId': userId
      },
      UpdateExpression: 'set info.count -= :amount',
      ExpressionAttributeValues: {
        ':amount': amount,
      },
      ReturnValues: 'UPDATED_NEW'
    };
    return new Promise((resolve, reject) => {
      this.docClient.update(params, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

const service = new CreditService(aws);

// service.init()
//   .catch(logger.error)
//   .then(logger.info);
// service.destroy()
//   .catch(logger.error)
//   .then(service.init)
//   .catch(logger.error);

module.exports = service;
