import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {name: "Lost", artist: "Frank Ocean", album: "Channel Orange", id: 1},
        {name: "Super Rich Kids", artist: "Frank Ocean", album: "Channel Orange", id: 2}
      ]
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist searchResults={this.state.searchResults}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;