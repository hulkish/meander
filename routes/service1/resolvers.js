'use strict';

const GoogleMapsService = require('../../services/google-maps');

const resolvers = {
  RootQuery: {
    geocode(parent, args, context, info) {// eslint-disable-line no-unused-vars
      return GoogleMapsService.geocode(args.address);
    },
    placesNearby(parent, args, context, info) {// eslint-disable-line no-unused-vars
      return GoogleMapsService.placesNearby(args);
    },
  },
};

module.exports =resolvers;
