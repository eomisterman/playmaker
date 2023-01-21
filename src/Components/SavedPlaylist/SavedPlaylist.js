import './SavedPlaylist.css';
import React from "react";

const SavedPlaylist = (props) => {
    return (
        <div className='SavedPlaylist' id={props.key}>
            <h2>{props.name}</h2>
            <p>{props.tracks.total}</p>
        </div>
    );
}

export default SavedPlaylist;