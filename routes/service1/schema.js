'use strict';

const { makeExecutableSchema } = require('graphql-tools');
const types = require('./types');
const resolvers = require('./resolvers');
const logger = require('../../lib/logger');
const gqlLogger = {
  log: logger.error.bind(this, '[GraphQL Schema]')
};

const RootQuery = `
  input LocationInput {
    lat: Float
    lng: Float
  }

  enum RankBy {
    prominence
    distance
  }

  type RootQuery {
    geocode(address: String): [Geocode]
    placesNearby(
      keyword: String
      rankby: RankBy = "prominence"
      location: LocationInput,
      language: String = "en",
      opennow: Boolean = true,
    ): [PlaceNearby]
    
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

const typeDefs = [
  SchemaDefinition,
  RootQuery,
  ...types
];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger: gqlLogger,
  allowUndefinedInResolve: false,
  resolverValidationOptions:  {},
});

module.exports = schema;
