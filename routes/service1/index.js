'use strict';

const graphqlHTTP = require('express-graphql');
const express = require('express');
const schema = require('./schema');

const app = express.Router();


app.use('/', graphqlHTTP(req => ({
  schema: schema,
  graphiql: true,
  pretty: true,
  rootValue: {
    session: req.session
  },
})));

module.exports = app;
