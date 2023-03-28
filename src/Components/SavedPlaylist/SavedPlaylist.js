import './SavedPlaylist.css';
import React from 'react';

function SavedPlaylist({
  id, name, tracks, onClick,
}) {
  const updateSelectedPlaylist = (event) => {
    onClick(event.target.id);
  };

  return (
    <div
      className="SavedPlaylist"
      id={id}
      onClick={updateSelectedPlaylist}
    >
      <h2>{name}</h2>
      <p>{tracks.total}</p>
    </div>
  );
}

export default SavedPlaylist;
