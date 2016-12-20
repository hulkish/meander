'use strict';

const config = {
  logging: {
    errorFile: 'errors.log',
    infoFile: 'infos.log',
    maxFileSize: 5242880,
    maxFilesPerLevel: 5,
  },
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
};

function verify() {
  if (!process.env.hasOwnProperty('GOOGLE_MAPS_API_KEY')) {
    throw new Error('Unable to locate required environment variable "GOOGLE_MAPS_API_KEY"');
  }
  return config;
}

module.exports = config;
module.exports.verify = verify;
