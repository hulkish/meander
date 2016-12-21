'use strict';

const graphql = require('graphql');

const RestaurantSchema = new graphql.GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    name: {
      type: graphql.GraphQLString
    }
  })
});

module.exports = RestaurantSchema;
