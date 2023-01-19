import './SongBrowser.css';
import React, { useState } from "react";
import Tracklist from '../Tracklist/Tracklist';
import Spotify from '../../util/Spotify';

const SongBrowser = (props) => {
    const [view, setView] = useState("");

    const [songs, setSongs] = useState([]);    
    const showSongs = () => {
        setView("songs");
        Spotify.top("tracks").then(result => {
            setSongs(result);
        }).catch((error) => {
            console.log(error);
        });
    }

    const changeView = (event) => {
        setView(event.target.value);
    }

    // const [ artists, setArtists] = useState([]);
    // const showArtists = () => {
    //     setView("artists");
        
    // }


    return (
        <div>
            <ul className='SongBrowser'>
                <li onClick={changeView} value="playlists">Your Playlists</li>
                <li onClick={showSongs} value="songs">Top Songs</li>
                <li onClick={changeView} value="artists">Top Artists</li>
                <li onClick={changeView} value="genres">Genres</li>
                <li onClick={changeView} value="search">Search</li>
            </ul>
            {view === "songs" && <Tracklist tracks={songs} onAdd={props.onAdd} isRemoval={false}/>}
        </div>
    );
}

export default SongBrowser;