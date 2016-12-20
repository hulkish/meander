'use strict';

const logger = require('../lib/logger');

const uncaughtExceptions = [];
const uncaughtRejections = [];

function uncaughtExceptionMiddleware(req, res, next) {
  if (uncaughtRejections.length) {
    logger.warn('Uncaught rejections detected:', uncaughtRejections.length);
  }
  if (uncaughtExceptions.length) {
    logger.error('Uncaught exceptions detected:', uncaughtExceptions.length);
    res.status(500).json({
      errors: [{
        message: 'Uncaught exceptions detected',
        count: uncaughtExceptions.length,
      }]
    });
    return;
  }
  next();
}

function bind() {
  process
    .on('uncaughtException', err => {
      logger.error(err, 'Uncaught exception');
      uncaughtExceptions.push(err);
    })
    .on('unhandledRejection', (reason, p) => {
      logger.info(`Possibly Unhandled Rejection at: Promise ${p} reason: ${reason}`);
    });

  return uncaughtExceptionMiddleware.bind(null, ...Array.from(arguments));
}

// bind();
// function pp(istrue) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (istrue) {
//         resolve('Yesssssss');
//       } else {
//         reject('Noooooooo');
//       }
//     }, 1000);
//   });
// }
//
// pp(true)
//   .then(logger.info)
//   .catch(logger.error);
// pp()
//   .then(logger.info)
//   .catch(logger.error);

module.exports = bind;
