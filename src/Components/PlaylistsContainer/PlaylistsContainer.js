import './PlaylistsContainer.css';
import React from "react";
import SavedPlaylist from '../SavedPlaylist/SavedPlaylist';

const PlaylistsContainer = (props) => {
    return (
        <div className='PlaylistsContainer'>
            <h1>Saved Playlists</h1>
            {props.playlists.map(playlist =>
                <SavedPlaylist 
                    key={playlist.id}
                    images={playlist.images}
                    name={playlist.name}
                    tracks={playlist.tracks}
                />
            )}
        </div>
    );
}

export default PlaylistsContainer;