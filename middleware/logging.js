'use strict';

const morgan = require('morgan');
const logger = require('../lib/logger');

function loggingMiddleware() {
  return morgan('combined', {
    stream: {
      write(message) {
        logger.info(message);
      }
    }
  });
}

module.exports = loggingMiddleware;
