import './ArtistsContainer.css';
import React from 'react';
import Artist from '../Artist/Artist';

function ArtistsContainer({ artists }) {
  return (

    <div className="ArtistsContainer">
      {artists.map((artist, index) => (
        <Artist
          key={artist.id}
          index={index}
          id={artist.id}
          name={artist.name}
          genres={artist.genres}
          images={artist.images}
        />
      ))}
    </div>

  );
}

export default ArtistsContainer;
