import './SongBrowser.css';
import React from "react";

const SongBrowser = (props) => {
    return (
        <ul className='SongBrowser'>
            <li>Your Playlists</li>
            <li>Top Songs</li>
            <li>Top Artists</li>
            <li>Genre</li>
            <li>Search</li>
        </ul>
    );
}

export default SongBrowser;