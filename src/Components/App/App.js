import React, { useState, useEffect } from 'react';
import './App.css';

import Header from '../Header/Header';
import Playlist from '../Playlist/Playlist';
import SongBrowser from '../SongBrowser/SongBrowser';

import Spotify, { redirectURI } from '../../util/Spotify';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    if (window.location.hash) {
      const [, accessToken] = window.location.hash.match(/access_token=([^&]*)/);
      const [, tokenExpiration] = window.location.hash.match('expires_in=([^&]*)')[1];
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('expiresIn');
      window.localStorage.setItem('token', accessToken);
      window.localStorage.setItem('expiresIn', tokenExpiration);
      setToken(accessToken);
      window.location = redirectURI;
    }
  }, [window.location.hash]);

  useEffect(() => {
    const { hash } = window.location;
    const spotifyToken = window.localStorage.getItem('token');
    let timeoutID;

    if (!token && spotifyToken) {
      setToken(spotifyToken);
    }

    if (!spotifyToken && hash) {
      // spotifyToken = hash.match('access_token=([^&]*)&')[1];
      const [, spotifyTokenHash] = hash.match(/access_token=([^&]*)/);
      const tokenExpiration = hash.match('expires_in=([^&]*)')[1];

      window.location.href = '';
      window.localStorage.setItem('token', spotifyTokenHash);
      window.localStorage.setItem('expiresIn', tokenExpiration);

      timeoutID = setTimeout(() => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('expiresIn');
      }, tokenExpiration * 1000);

      setToken(spotifyTokenHash);
    }
    return () => {
      clearTimeout(timeoutID);
    };
  }, [token, setToken]);

  const [playlistName, setPlaylistName] = useState('Playlist Name...');
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const [playlistTracks, setPlaylistTracks] = useState([]);
  const addTrack = (track) => {
    setPlaylistTracks((prev) => [track, ...prev]);
  };
  const removeTrack = (track) => {
    setPlaylistTracks((prev) => prev.filter((song) => song.id !== track.id));
  };

  const signOut = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('expiresIn');
    setToken('');
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName('Playlist Name...');
      setPlaylistTracks([]);
    });
  };

  if (!token) {
    return (
      <div className="login">
        <h1>
          Play
          <span className="highlight">list</span>
          maker
        </h1>
        <div className="App-login">
          <a href={Spotify.accessUrl} className="Button-spotify">Login in with Spotify</a>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header signOut={signOut} />
      <div className="layout">
        <aside className="sidebar">
          <Playlist
            playlistName={playlistName}
            onNameChange={updatePlaylistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onSave={savePlaylist}
          />
        </aside>
        <main className="main">
          <SongBrowser onAdd={addTrack} />
        </main>
      </div>
    </div>
  );
}

export default App;
