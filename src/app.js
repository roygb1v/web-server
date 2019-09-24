const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Roy Cheong'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Roy Cheong'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help F.A.Q',
    name: 'Roy Cheong',
    message: 'What do you need help on ?'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }
  const address = req.query.address;
  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error: error});
    }

    forecast(latitude, longitude, (error, response) => {
      if (error) {
        return res.send({error: 'Sorry, cant find forecast!'});
      }
      res.send({
        forecast: response.body.currently.summary,
        location
      })
    })
  }) 
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query);
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('helpError', {
    title: '404',
    name: 'Roy Cheong',
    errorMessage: 'Help page not found!'
  });
})

// match everything that hasnt been matched before
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Roy Cheong',
    errorMessage: 'Page Not Found!'
  });
})

app.listen(3333, () => {
  console.log('Server listening on port 3333...');
});