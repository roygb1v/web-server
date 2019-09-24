const request = require('request');

const forecast = (lat, long, callback) => {
  const url = "https://api.darksky.net/forecast/060c24a41a02b7c7a74edd075770b341/" + lat + ',' + long;

  request({url: url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to service!', undefined);
    } else if (response.body.error) {
      callback('Unable to retreive forecast data!', undefined);
    } else {
      callback(undefined, response);
    }
  });
}

module.exports = forecast;