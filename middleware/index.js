'use strict';

const helmet = require('helmet');
const compression = require('compression');
const loggingMiddleware = require('./logging');

const middleware = () => [
  helmet(),
  loggingMiddleware(),
  compression(),
];

module.exports = middleware;
