'use strict';

const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
// const passport = require('passport');

// const loggingMiddleware = require('./middleware/logging');
const config = require('./config');
const logger = require('./lib/logger');
logger.info(config);
const routes = require('./routes');

const app = express();

app.use(morgan('dev'));
// app.use(loggingMiddleware());
app.use(compression());
app.use('/api', routes);


app.listen(config.server.port, config.server.host, function() {
  logger.info(`Listening on port ${this.address().port}`);
});

app.on('error', logger.error);
