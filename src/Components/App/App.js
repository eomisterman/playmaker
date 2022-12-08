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
      ],
      playlistName: "My First Playlist!",
      playlistTracks: [
        {name: "Pilot Jones", artist: "Frank Ocean", album: "Channel Orange", id: 3},
        {name: "Pyramids", artist: "Frank Ocean", album: "Channel Orange", id: 4}
      ],
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    let inPlaylist = this.state.playlistTracks.find(song => song.id === track.id);
    if (inPlaylist) {
      return;
    } else {
      let updatedPlaylist = this.state.playlistTracks;
      updatedPlaylist.push(track);
      this.setState({ playlistTracks: updatedPlaylist })
    }
  }

  removeTrack(track) {
    let updatedPlaylist = this.state.playlistTracks.filter(song => song.id !== track.id);
    this.setState({ playlistTracks: updatedPlaylist });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist 
              playlistName={this.state.playlistName} 
              onNameChange={this.updatePlaylistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;