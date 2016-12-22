'use strict';

const express = require('express');

const logger = require('./lib/logger');
const serverConfig = require('./config/server');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

middleware().forEach(mw => app.use(mw));

app
  .use('/api', routes)
  .use('/', express.static('public'))
  .listen(serverConfig.port, serverConfig.host, function() {
    let { address, port } = this.address();
    logger.info(`Listening on ${address}:${port}`);
  })
  .on('error', logger.error);

module.exports = app;
