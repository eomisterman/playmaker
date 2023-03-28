import './PlaylistsContainer.css';
import React, { useState } from 'react';
import SavedPlaylist from '../SavedPlaylist/SavedPlaylist';
import Spotify from '../../util/Spotify';
import Tracklist from '../Tracklist/Tracklist';

function PlaylistsContainer(props) {
  const [selectedPlaylist, setSelectedPlaylist] = useState([]);
  const updateSelectedPlaylist = async (playlistID) => {
    await Spotify.getPlaylistTracks(playlistID).then((result) => {
      setSelectedPlaylist(result);
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="PlaylistsContainer">
      <div id="playlistTable">
        {props.playlists.map((playlist) => (
          <SavedPlaylist
            key={playlist.id}
            id={playlist.id}
            images={playlist.images}
            name={playlist.name}
            tracks={playlist.tracks}
            onClick={updateSelectedPlaylist}
          />
        ))}
      </div>
      <div id="playlistTracks">
        <Tracklist
          tracks={selectedPlaylist}
          onAdd={props.onAdd}
          isRemoval={false}
        />
      </div>
    </div>
  );
}

export default PlaylistsContainer;
