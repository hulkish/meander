'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const GeocodingService = require('../services/geocoding');
const test = new GeocodingService({ apiKey: require('../config').googleMapsApiKey });
const app = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/:address', function(req, res) {
  test.lookupAddress('2630 Garland Way, Duluth GA, 30096', function(err, body) {
    // console.log('response', util.inspect(body, { depth: null, colors: true }));
    setImmediate(() => res.status(200).json(body));
  });
});

module.exports = app;
