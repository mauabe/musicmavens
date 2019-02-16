import React, { Component } from'react';
import axios from 'axios';
import Search from './Search';
import Artist from './Artist';
import Tracks from './Tracks';

const URL = 'https://spotify-api-wrapper.appspot.com/'

class App extends Component{
  state = { artist: null, tracks: []};

  // componenDidMount(){
  //   this.searchArtist('elvis presley')
  // }

  //using fetch
  // searchArtist = () => {
  //   fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
  //     .then(response => response.json())
  //     .then(json => {console.log('json', json)})
  //     .catch(error => {console.log('error', error)})
  // }

  //using axios, baby!
  searchArtist = artistQuery => {
    axios.get(`${URL}/artist/${artistQuery}`)
    .then((response) => {
      if (response.data.artists.items.length > 0){
        const artist = response.data.artists.items[0];
        const artistId = response.data.artists.items[0].id;

        this.setState({ artist, artistId })

        axios.get(`${URL}/artist/${artistId}/top-tracks`)
          .then(tracksObj => {
            this.setState({ tracks: tracksObj.data.tracks })
          })
          .catch(error => alert(error.message))
      }
    }) 
    .catch(error => alert(error.message))
  }
  
  render(){
    // console.log('this.state at render', this.state);
    return(
      <div> 
        <h2>Music-Mavens</h2>
        <Search searchArtist={this.searchArtist} />
        <Artist artist={this.state.artist} />
        <Tracks tracks={this.state.tracks} />
      </div>
    );
  }
}

export default App;