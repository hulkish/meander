'use strict';

if (!process.env.hasOwnProperty('AWS_DYNAMODB_ENDPOINT')) {
  throw new Error('Unable to locate required environment variable "AWS_DYNAMODB_ENDPOINT"');
}
if (!process.env.hasOwnProperty('AWS_ACCESS_KEY_ID')) {
  throw new Error('Unable to locate required environment variable "AWS_ACCESS_KEY_ID"');
}
if (!process.env.hasOwnProperty('AWS_SECRET_ACCESS_KEY')) {
  throw new Error('Unable to locate required environment variable "AWS_SECRET_ACCESS_KEY"');
}
if (!process.env.hasOwnProperty('AWS_REGION')) {
  throw new Error('Unable to locate required environment variable "AWS_REGION"');
}

const config = {
  endpoint: process.env.AWS_DYNAMODB_ENDPOINT,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
};

module.exports = config;
