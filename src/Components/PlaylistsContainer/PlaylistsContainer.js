import './PlaylistsContainer.css';
import React from "react";
import SavedPlaylist from '../SavedPlaylist/SavedPlaylist';

const PlaylistsContainer = (props) => {
    return (
        <div className='PlaylistsContainer'>
            {/* <h1>Saved Playlists</h1> */}
            <div id="playlistTable">
                {props.playlists.map((playlist, index) =>
                    <SavedPlaylist 
                        key={index}
                        id={playlist.id}
                        images={playlist.images}
                        name={playlist.name}
                        tracks={playlist.tracks}
                    />
                )}
            </div>
        </div>
    );
}

export default PlaylistsContainer;