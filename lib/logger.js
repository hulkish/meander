'use strict';

const config = require('../config/logging');
const winston = require('winston');
winston.emitErrs = true;

const logger = new winston.Logger({
  level: config.logLevel,
  emitErrs: true,
  exitOnError: false,
  colors: {
    error: 'red',
    info: 'reset',
    debug: 'dim',
    warn: 'yellow',
  },
  exceptionHandlers: [
    new winston.transports.File({
      level: 'error',
      filename: config.errorFile,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false,
      maxsize: config.maxFileSize,
      maxFiles: config.maxFilesPerLevel,
      colorize: false
    }),
  ],
  transports: [
    new winston.transports.Console({
      level: 'debug',
      colorize: 'all'
    })
  ],
});

module.exports = logger;
module.exports.stream = {
  write(message) {
    logger.info(message);
  }
};
