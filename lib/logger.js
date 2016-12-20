'use strict';

const winston = require('winston');
winston.emitErrs = true;

const config = require('../config');

const logger = new winston.Logger({
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
      filename: config.logging.errorFile,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false,
      maxsize: config.logging.maxFileSize,
      maxFiles: config.logging.maxFilesPerLevel,
      colorize: false
    }),
  ],
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: config.logging.infoFile,
      handleExceptions: false,
      json: false,
      maxsize: config.logging.maxFileSize,
      maxFiles: config.logging.maxFilesPerLevel,
      colorize: false
    }),
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
