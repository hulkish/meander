'use strict';

if (!process.env.hasOwnProperty('GOOGLE_MAPS_API_KEY')) {
  throw new Error('Unable to locate required environment variable "GOOGLE_MAPS_API_KEY"');
}

const config = {
  apiKey: process.env.GOOGLE_MAPS_API_KEY
};

module.exports = config;
