'use strict';

const morgan = require('morgan');
const logger = require('../lib/logger');

function loggingMiddleware() {
  return morgan('combined', {
    immediate: true,
    stream: logger.stream
  });
}

module.exports = loggingMiddleware;
