import React, { Component} from'react';

const API_ADDRESS = 

class App extends Component{
  state = { artistQuery: ''};

  updateArtistQuery = (event) => {
    console.log('event.target.value', event.target.value);
    this.setState({artistQuery: event.target.value})
  }

  handleKeyPress = event => {
    if(event.key === 'Enter'){
      this.searchArtist();
    }
  }

  searchArtist = () => {
    console.log('this.state', this.state);
  }

  render(){
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