const request = require('request');

const geocode = (address, callback) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoicm95Z2JpdiIsImEiOiJjazB3bDB0NzQxYjRjM2Jwb2FjNmkya2VqIn0.I9Lxq1jRMOUgAT2JFBQyig&limit=1";

  request({url: url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to service', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to retreive location', undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      });
    }
  });
}

module.exports = geocode;