import './SongBrowser.css';
import React, { useState } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import Spotify from '../../util/Spotify';
import ArtistsContainer from '../ArtistsContainer/ArtistsContainer';
import PlaylistsContainer from '../PlaylistsContainer/PlaylistsContainer';
import SearchBar from '../SearchBar/SearchBar';

function SongBrowser(props) {
  const [view, setView] = useState('');

  const [songs, setSongs] = useState([]);
  const showSongs = async () => {
    await Spotify.topTracks().then((result) => {
      setSongs(result);
    }).catch((error) => {
      console.error(error);
    });
    setView('songs');
  };

  const changeView = (event) => {
    setView(event.target.value);
  };

  const [artists, setArtists] = useState([]);
  const showArtists = () => {
    Spotify.topArtists()
      .then((result) => {
        setArtists(result);
        setView('artists');
      })
      .catch((error) => {
        console.error(error);
        // handle the error by setting the artists state to an empty array
        setArtists([]);
        setView('artists');
      });
  };

  const [playlists, setPlaylists] = useState([]);
  const showPlaylists = async () => {
    await Spotify.getPlaylists().then((result) => {
      setPlaylists(result);
    }).catch((error) => {
      console.error(error);
    });
    setView('playlists');
  };

  return (
    <div className="SongBrowser">
      <nav className="nav">
        <ul className="nav-list">
          <li onClick={showPlaylists} value="playlists">Your Playlists</li>
          <li onClick={showSongs} value="songs">Top Songs</li>
          <li onClick={showArtists} value="artists">Top Artists</li>
          <li onClick={changeView} value="genres">Genres</li>
          <li onClick={changeView} value="search">Search</li>
        </ul>
      </nav>
      <main className="content">
        {view === 'playlists' && (
          <PlaylistsContainer
            playlists={playlists}
            onAdd={props.onAdd}
          />
        )}
        {view === 'songs' && (
        <Tracklist
          tracks={songs}
          onAdd={props.onAdd}
          isRemoval={false}
        />
        )}
        {view === 'artists'
                && <ArtistsContainer artists={artists} />}
        {view === 'search' && (
          <SearchBar />
        )}
      </main>
    </div>

  );
}

export default SongBrowser;
