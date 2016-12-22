'use strict';

const test = require('tape');
const GoogleMapsService = require('./google-maps');

test('services/google-maps', t => {
  t.doesNotThrow(function () {
    GoogleMapsService.geocode();
  });
  t.end();
});
