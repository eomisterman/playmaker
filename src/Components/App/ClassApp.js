import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class ClassApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "Enter Playlist Name...",
      playlistTracks: [],
      token: "",
      tokenExpiration: ''
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
    let trackURIs = this.state.playlistTracks.map(track => track.uri );
    Spotify.save(this.state.playlistName, trackURIs).then(() => {
      this.setState({ playlistName: "Enter Playlist Name...", playlistTracks: [] })
    });
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(result => {
      this.setState({ searchResults: result });
    }).catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    let expiresIn;

    if (!this.state.token && hash) {
      token = hash.match('access_token=([^&]*)&')[1];
      expiresIn = hash.match('expires_in=([^&]*)')[1];

      window.location.hash = "";

      window.localStorage.setItem('token', token);
      this.setState({ token: token })
    }
  }

  render() {
    return (
      <div>
        <h1>Play<span className="highlight">list</span>maker</h1>
        <div className="App">
          { !this.state.token && <a href={Spotify.accessUrl} className="Button-spotify" >Login in with Spotify</a> }
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

export default ClassApp;