import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

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
      token: ""
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  savePlaylist() {
    // Generate an array of uri values called trackURIs from the playlistTracks property
    // Pass the trackURIs array and playlistName to a method that will save the user's playlist to their account
    console.log('App.js:52 - savePlaylist() called.');
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(result => {
      this.setState({ searchResults: result });
    });
  }

  componentDidMount() {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    console.log(token);
    if (!this.state.token && hash) {
      token = hash.match('access_token=([^&]*)&')[1];
      let expiresIn = hash.match('expires_in=([^&]*)')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', token);
      window.setTimeout(() => {
        window.localStorage.removeItem('token');
        this.setState({ token: '' })
      }, expiresIn * 1000);

      this.setState({ token: token })
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          { !this.state.token && <a href={Spotify.accessUrl} className="Button-spotify" onClick="handleLogin">Login in with Spotify</a> }
          {this.state.token && <SearchBar onSearch={this.search} />}
          <div className="App-playlist">
            {this.state.token && <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />}
            {this.state.token && <Playlist 
              playlistName={this.state.playlistName} 
              onNameChange={this.updatePlaylistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist} />}
          </div>
        </div>
      </div>
    );
  }
}

export default App;