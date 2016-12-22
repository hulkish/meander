'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const GoogleMapsService = require('../services/google-maps');
const logger = require('../lib/logger');
const CreditService = require('../services/credit');
const app = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/:address', function(req, res) {
  const performRequest = credits => GoogleMapsService
    .geocode(req.params.address)
    .then(data => {
      setImmediate(() => res.status(200).json({
        credits,
        data
      }));
    })
    .catch(logger.error);
  CreditService
    .decrement('steven.hargrove@gmail.com', 1)
    .then(performRequest)
    .catch(logger.error);
});
app.get('/reset-credits/:amount', function(req, res) {
  const performRequest = credits => GoogleMapsService
    .geocode(req.params.address)
    .then(data => {
      setImmediate(() => res.status(200).json({
        credits,
        data
      }));
    })
    .catch(logger.error);
  CreditService
    .decrement('steven.hargrove@gmail.com', 1)
    .then(performRequest)
    .catch(logger.error);
});

module.exports = app;
