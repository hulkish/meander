'use strict';

const test = require('tape');
const CreditService = require('./credit');

test('services/credit', function(t) {
  t.doesNotThrow(function () {
    CreditService;
  });
  t.end();
});
