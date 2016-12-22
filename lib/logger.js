'use strict';

const config = require('../config/logging');
const winston = require('winston');
winston.emitErrs = true;

const logger = new winston.Logger({
  level: config.logLevel,
  json: false,
  emitErrs: true,
  exitOnError: false,
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  timestamp: Date.now,
  exceptionHandlers: [
    new winston.transports.File({
      level: 'error',
      filename: config.errorLogFile,
      humanReadableUnhandledException: true,
      handleExceptions: true,
      timestamp: true,
      colorize: false,
      json: false,
    }),
  ],
  transports: [
    new winston.transports.File({
      level: 'debug',
      filename: config.logFile,
      humanReadableUnhandledException: true,
      handleExceptions: true,
      timestamp: true,
      colorize: false,
      json: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      colorize: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      prettyPrint: true,
      showLevel: true,
      timestamp: true,
      json: false,
    }),
  ],
});

if (process.env.NODE_ENV === 'test') {
  winston.emitErrs = false;
  winston.handleExceptions = false;
  winston.loggers.default.silent = true;
  logger.transports.file.silent = true;
  logger.transports.console.silent = true;
  logger.exceptionHandlers.file.silent = true;
  logger.handleExceptions = false;

  // logger.transports.
}


module.exports = logger;
