const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const request = require("request");

// Default options object for RapidAPI requests
let options = {
  method: "GET",
  url: "https://movies-tvshows-data-imdb.p.rapidapi.com/",
  qs: { type: "get-boxoffice-movies", page: "1" },
  headers: {
    "x-rapidapi-key": "ae04c4b3eamshade53828736ec10p107dd9jsn159927be2ebf",
    "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
    useQueryString: true,
  },
};

app.get("/api/movies", (req, res) => {
  options.qs = { type: "get-boxoffice-movies", page: "1" };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    // body.movie_results.forEach(function(movie_details) {
    //   options.qs = { type: "get-movies-images-by-imdb", "imdb": movie_details.imdb_id};
    //   request(options, function (error, response, body) {
    //     console.log('ayyyyy', body);
    //   });
    //   console.log(movie_details);
    // });
    res.send(body);
    
  });
});

app.get("/api/movies/image/:imdb_id", (req, res) => {
  options.qs = { type: "get-movies-images-by-imdb", "imdb": req.params.imdb_id };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    // body.movie_results.forEach(function(movie_details) {
    //   options.qs = { type: "get-movies-images-by-imdb", "imdb": movie_details.imdb_id};
    //   request(options, function (error, response, body) {
    //     console.log('ayyyyy', body);
    //   });
    //   console.log(movie_details);
    // });
    console.log('imageDATA', body);
    res.send(body);
    
  });
});

app.get("/api/movies/search", (req, res) => {
  options.qs = { type: "get-movies-by-title", title: req.query.title };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
    console.log(body);
  });
});

app.get("/api/movie/details", (req, res) => {
  options.qs = { type: "get-movie-details", imdb: req.query.imdb };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
    console.log(body);
  });
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));