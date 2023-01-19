import './TopSongs.css';
import React from 'react';
import Tracklist from '../Tracklist/Tracklist';

const TopSongs = (props) => {
    return (
        <div className="TopSongs">
            <h2>Your Top Songs</h2>
            <Tracklist tracks={props.tracks} onAdd={props.onAdd} isRemoval={false}/>
        </div>
    );
}

export default TopSongs;