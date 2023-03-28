import React, { useState } from 'react';
import './Track.css';

function Track(props) {
  const [audio, setAudio] = useState(null);

  const playPreview = () => {
    const newAudio = new Audio(props.track.preview);
    newAudio.play()
      .then(() => {

      })
      .catch((error) => {
        console.error(error);
      });
    setAudio(newAudio);
  };

  const stopPreview = () => {
    if (!audio) return;

    audio.pause();
    setAudio(null);
  };

  const addTrack = () => {
    props.onAdd(props.track);
  };

  const removeTrack = () => {
    props.onRemove(props.track);
  };

  const renderAction = () => {
    const action = props.isRemoval ? (
      <button
        type="button"
        className="Action-button"
        onClick={removeTrack}
      >
        -
      </button>
    ) : (
      <button
        type="button"
        className="Action-button"
        onClick={addTrack}
      >
        +
      </button>
    );
    return (action);
  };

  return (

    <div
      className="Track"
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
    >
      <figure className="Track-image">
        <img src={props.track.images.at(-1).url} alt="img" />
      </figure>
      <div className="Track-information">
        <header className="Track-header">
          <h3 className="Track-name">{props.track.name}</h3>
          <p className="Track-meta">
            {props.track.artist}
            {' '}
            |
            {' '}
            {props.track.album}
          </p>
        </header>
      </div>
      <div className="Track-action">
        {renderAction()}
      </div>
    </div>

  );
}

export default Track;
