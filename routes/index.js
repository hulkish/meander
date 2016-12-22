'use strict';

const express = require('express');
const service1Route = require('./service1');
const service2Route = require('./service2');

const app = express.Router();

app.get('/', (req, res) => {
  res.status(200).json({
    healthy: true
  });
});
app.use('/service1', service1Route);
app.use('/service2', service2Route);

module.exports = app;
