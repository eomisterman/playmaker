import './SavedPlaylist.css';
import React from "react";

const SavedPlaylist = (props) => {
    return (
        <div className='SavedPlaylist' id={props.key}>
            <h3>{props.name}</h3>
            <p>{props.tracks.total}</p>
        </div>
    );
}

export default SavedPlaylist;