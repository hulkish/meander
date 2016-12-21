'use strict';

const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
// const passport = require('passport');

const loggingMiddleware = require('./middleware/logging');
const logger = require('./lib/logger');
const serverConfig = require('./config/server');
const routes = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(loggingMiddleware());
app.use(compression());
app.use('/api', routes);
app.use('/', express.static('public'));

app.listen(serverConfig.port, serverConfig.host, function() {
  logger.info(`Listening on ${serverConfig.host}:${serverConfig.port}`);
});

app.on('error', logger.error);
