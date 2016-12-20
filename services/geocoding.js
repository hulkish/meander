'use strict';

const EventEmitter = require('events').EventEmitter;
const googleMaps = require('@google/maps');

const GMAPS_CLIENT = new WeakMap();

class GeocodingService extends EventEmitter {
  constructor(key) {
    super();

    if (!GMAPS_CLIENT.get(this)) {
      GMAPS_CLIENT.set(this, googleMaps.createClient({
        key: key
      }));
    }
  }

  lookupAddress(address, done) {
    this.googleMapsClient.geocode({
      address
    }, function(err, res) {
      if (err) {
        console.error(err);
      }
      if (typeof done === 'function') {
        done(err, res.json.results);
      }
    });
  }
}

const GeocodingServiceFactory = {
  createClient(key) {
    if (!this.client) {
      this.client = new GeocodingService(key);
    }

    return this.client;
  }
};

module.exports = GeocodingServiceFactory;
