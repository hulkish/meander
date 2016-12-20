'use strict';

const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const express = require('express');
const app = express.Router();

const RootQuery = new graphql.GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: {
    healthcheck: {
      type: graphql.GraphQLString,
      resolve() {
        return 'healthy';
      }
    }
  }
});

const schema = new graphql.GraphQLSchema({
  query: RootQuery
});

app.use('/', graphqlHTTP(req => ({
  schema: schema,
  graphiql: true,
  pretty: true,
  rootValue: {
    session: req.session
  },
})));

module.exports = app;
