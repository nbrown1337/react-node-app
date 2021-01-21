import React, { Component } from 'react';

import logo from './logo.svg';
import background from './movie-reel.jpg'
import {ReactComponent as ImdbLogo}from './imdb-brands.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import * as Icons from '@fortawesome/free-solid-svg-icons';
import './App.css';

const iconList = Object
  .keys(Icons)
  .filter(key => key !== "fas" && key !== "prefix" )
  .map(icon => Icons[icon])

library.add(...iconList)

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    movies: null,
    movieDetails: null,
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/movies');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    this.setState({ movies: body });
    return body;
  };

  handleSubmitClick = async e => {
    e.preventDefault();
    const response = await fetch('/api/movies/search?title=' +this.state.post, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();

    this.setState({ movies: body });
  };


  handleMovieClick = async (imdb_id) => {
    const response = await fetch('/api/movie/details?imdb=' +imdb_id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
  
    this.setState({ movieDetails: body });
  };

  handleBackClick = async (e) => {
    this.setState({ movieDetails: null });
  };

  render() {

    return (
      <div className="App">
        <p>{this.state.response}</p>
        

          <div className="container">
  <div className="info">
    <h1>React NodeJS Movie Search</h1><span>Made with <FontAwesomeIcon className="fa" icon="heart" /> by <a href='#'>Nathan Brown</a></span>
    <div className="formDiv">
          <form onSubmit={this.handleSubmitClick}>
            
            <input type="text" value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })} className="textbox" placeholder="Search movie titles"/>
            <button title="Search" value="" type="submit" className="button"><FontAwesomeIcon className="fa" icon="search" /> </button>
            
            
          </form>
          <p>{this.state.responseToPost}</p>
        </div>
  </div> 
  {this.state.movies && !this.state.movieDetails && this.state.movies.movie_results.map((movie, index) => ( 
    <div className="column" onClick={()=>this.handleMovieClick(movie.imdb_id)} key={index}>
      <div className="demo-title"></div>
     
      <div className="post-module">
        
        <div className="thumbnail">
          <div className="date">
            <div className="day">{movie.year}</div>
          </div><img src={background}/>
        </div>
       
        <div className="post-content">
          <div className="category">Movie</div>
          <h1 className="title">{movie.title}</h1>
          <div className="post-meta"><span className="timestamp"><ImdbLogo className="imdbLogo"/>
            - ID: {movie.imdb_id}</span></div>
        </div>
      </div>
    </div>
  ))}
  {this.state.movieDetails &&
    <div className="column wide">
      <div className="demo-title"></div>
     
      <div className="post-module wide">
        
        <div className="thumbnail">
          <div className="date">
            <div className="day">{this.state.movieDetails.year}</div>
          </div><img src={background}/>
        </div>
       
        <div className="post-content wide">
          <div className="category">Movie</div>
          <h1 className="title">{this.state.movieDetails.title}</h1>
          <div className="post-meta wide">
          <div style={{flex: '50%'}}>
            <ul style={{listStyleType: 'none',  textAlign: 'left'}}>
              {this.state.movieDetails.description && <li className="leftList"> <span className="bold"> Description: </span> {this.state.movieDetails.description}</li> }
              {this.state.movieDetails.rated && <li className="leftList"> <span className="bold"> Rating: </span> {this.state.movieDetails.rated}</li> }
              {this.state.movieDetails.release_date && <li className="leftList"> <span className="bold"> Release Date: </span> {this.state.movieDetails.release_date}</li> }
              {this.state.movieDetails.runtime && <li className="leftList"> <span className="bold"> Runtime: </span> {this.state.movieDetails.runtime} minutes</li> }
            </ul>
            <ul style={{listStyleType: 'none', textAlign: 'left'}}> <span className="leftList bold"> Countries: </span> {this.state.movieDetails.countries.map((country, index) => (
                <li className="leftList" key={index}>{country}</li>
              ))} 
              </ul>
              <ul style={{listStyleType: 'none', textAlign: 'left'}}> <span className="leftList bold"> Genres: </span> {this.state.movieDetails.genres.map((genres, index) => (
                <li className="leftList" key={index}>{genres}</li>
              ))} 
            </ul>
            </div>
            <div style={{flex: '50%'}}>
              <ul style={{listStyleType: 'none'}}> <span className="bold"> Directors: </span> {this.state.movieDetails.directors.map((director, index) => (
                <li key={index}>{director}</li>
              ))} 
              </ul>
              <ul style={{listStyleType: 'none'}}> <span className="bold"> Stars: </span> {this.state.movieDetails.stars.map((star, index) => (
                <li key={index}>{star}</li>
              ))} 
              </ul>
            </div>
          </div>
          <FontAwesomeIcon className="back-btn"  icon="arrow-circle-left" onClick={this.handleBackClick} />
        </div>
      </div>
    </div>
  }

  
  
</div>


      </div>
    );
  }
}

export default App;
