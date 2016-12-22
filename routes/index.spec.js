'use strict';

const test = require('tape');
const supertest = require('supertest');
const app = require('../index');

test('/api GET', t => {
  supertest(app)
  .get('/api')
  .expect(200)
  .end(function (err, res) {
    if (err) {
      t.fail(err);
      t.end();
    } else {
      t.ok(res.body, 'should have response body');
      t.equals(res.body.healthy, true, 'should be healthy');
      t.end();
    }
  });
});

test.onFinish(() => process.exit(0));
