const geocode = require('./geocode');
const forecast = require('./forecast');

const argument = String(process.argv.slice(2).join(' '));

geocode(argument, (error, data) => {
  if (error) {
    return console.log(error);
  }
  forecast(data.latitude, data.longitude, (error, data) => {
    if (error) {
      return console.log(error);
    }
    return data.body.currently;
  })
})