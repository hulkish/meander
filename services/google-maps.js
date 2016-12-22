'use strict';

const EventEmitter = require('events').EventEmitter;
const googleMaps = require('@google/maps');
const config = require('../config/google-maps');
const logger = require('../lib/logger');

class GoogleMapsService extends EventEmitter {
  constructor(key) {
    super();

    if (!this.client) {
      this.client = googleMaps.createClient({
        Promise: Promise,
        key: key
      });
    }
  }

  placesNearby({ keyword, rankby, location, language, opennow, }) {
    return this.client.placesNearby({ keyword, location, language, rankby, opennow, })
    .asPromise()
    .then(data => {
      return data.json.results;
    })
    .catch(err => logger.error(err));
  }

  geocode(address) {
    return this.client.geocode({ address })
    .asPromise()
    .then(data => {
      return data.json.results;
    })
    .catch(err => logger.error(err));
  }
}

const service = new GoogleMapsService(config.apiKey);

module.exports = service;
