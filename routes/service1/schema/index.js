'use strict';

const graphql = require('graphql');
const RestaurantSchema = require('./restaurant');

const RootQuery = new graphql.GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    restaurant: RestaurantSchema
  })
});

const schema = new graphql.GraphQLSchema({
  query: RootQuery
});

module.exports = schema;
