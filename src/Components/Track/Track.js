import React, { useState } from "react";
import './Track.css';

const Track = (props) => {
    const [audio, setAudio] = useState(null);

    const playPreview = () => {
        const audio = new Audio(props.track.preview);
        audio.play()
            .then(() => {
                console.log(`${props.track.name} currently playing`);
            })
            .catch((error) => {
                console.log(error);
            })
        setAudio(audio);
    }

    const stopPreview = () => {
        if (!audio) return;

        audio.pause();
        setAudio(null);
    }

    const addTrack = () => {
        props.onAdd(props.track);
    }

    const removeTrack = () => {
        props.onRemove(props.track);
    }

    const renderAction = () => {
        let action = props.isRemoval ? (
            <button 
                className="Track-action"
                onClick={removeTrack}>-</button>) : (
            <button 
                className="Track-action" 
                onClick={addTrack}>+</button>);
        return (action);
    }

    return (
        <div 
            className="Track" 
            onMouseEnter={playPreview}
            onMouseLeave={stopPreview} >
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            {renderAction()}
        </div>
    );
}

export default Track;