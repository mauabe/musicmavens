import React, { Component} from'react';
import axios from 'axios'

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com/'
const URL = 'https://spotify-api-wrapper.appspot.com/'

// let result = () => {
//   axios.get(URL)
//   .then((response) => {
//     console.log(response);
//     return response;
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// }


class App extends Component{
  state = { artistQuery: '', artist: null, tracks: []};

  updateArtistQuery = (event) => {
    this.setState({artistQuery: event.target.value})
  }

  handleKeyPress = event => {
    if(event.key === 'Enter'){
      this.searchArtist();
    }
  }

  //using fetch
  // searchArtist = () => {
  //   console.log('this.state', this.state);
  //   fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
  //   .then(response => response.json())
  //   .then(json => {
  //     console.log('json', json)
  //   })
  //   .catch(error => {
  //     console.log('error', error)
  //   })
  // }

  //using axios, baby!
  searchArtist = () => {
    axios.get(`${URL}/artist/${this.state.artistQuery}`)
    .then((response) => {
      if (response.data.artists.items.length > 0){
        const artist = response.data.artists.items[0];
        const artistId = response.data.artists.items[0].id;
        this.setState({ artist, artistId })

        axios.get(`${URL}/artist/${artistId}/top-tracks`)
          .then(tracksObj => {
            this.setState({ tracks: tracksObj.data.tracks })
            // console.log('tracks tracksObj', tracksObj.data.tracks)
          })
          .catch(error => alert(error.message))
      }
    }) 
    .catch(error => alert(error.message))
  }
  

  render(){
    console.log('this.state at render', this.state);
    return(
      <div> 
        <h2>mmavens</h2>
        <input 
          onChange={this.updateArtistQuery}
          placeholder='Search for and Artist' 
          onKeyPress={this.handleKeyPress}
          />
        <button onClick={this.searchArtist}> Search</button>
      </div>
    )
  }
}


export default App;