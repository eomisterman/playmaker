import './PlaylistsContainer.css';
import React, { useState } from "react";
import SavedPlaylist from '../SavedPlaylist/SavedPlaylist';
import Spotify from '../../util/Spotify';
import Tracklist from '../Tracklist/Tracklist';

const PlaylistsContainer = (props) => {

    const [ selectedPlaylist, setSelectedPlaylist ] = useState([]);
    const updateSelectedPlaylist = async (playlistID) => {
        console.log(playlistID)
        await Spotify.getPlaylistTracks(playlistID).then(result => {
            console.log(Array.isArray(result));
            setSelectedPlaylist(result);
        }).catch((error) => {
            console.log(error);
        });
    }
    
    return (
        <div className='PlaylistsContainer'>
            <div id="playlistTable">
                {props.playlists.map((playlist, index) =>
                    <SavedPlaylist 
                        key={index}
                        id={playlist.id}
                        images={playlist.images}
                        name={playlist.name}
                        tracks={playlist.tracks}
                        onClick={updateSelectedPlaylist}
                    />
                )}
            </div>
            <div id="playlistTracks">
                <Tracklist
                    tracks={selectedPlaylist}
                    onAdd={props.onAdd}
                    isRemoval={false} />
            </div>
        </div>
    );
}

export default PlaylistsContainer;