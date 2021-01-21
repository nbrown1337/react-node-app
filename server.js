const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});





const http = require("https");
const request = require('request');

let options = {
  method: 'GET',
  url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
  qs: {type: 'get-boxoffice-movies', page: '1'},
  headers: {
    'x-rapidapi-key': 'ae04c4b3eamshade53828736ec10p107dd9jsn159927be2ebf',
    'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
    useQueryString: true
  }
};



app.get('/api/movies', (req, res) => {
  options.qs = {type: 'get-boxoffice-movies', page: '1'};
  request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(body);
  console.log(body);
  });
});

app.get('/api/movies/search', (req, res) => {
  options.qs = {type: 'get-movies-by-title', title: req.query.title};
  request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(body);
  console.log(body);
  });
});

app.get('/api/movie/details', (req, res) => {
  options.qs = {type: 'get-movie-details', imdb: req.query.imdb};
  request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(body);
  console.log(body);
  });
});




if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
