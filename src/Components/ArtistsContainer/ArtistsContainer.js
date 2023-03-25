import './ArtistsContainer.css';
import React from 'react';
import Artist from '../Artist/Artist';

const ArtistsContainer = (props) => {
    return (


        <div className='ArtistsContainer'>
            {props.artists.map((artist, index) => 
                <Artist
                    index={index}
                    id={artist.id}
                    name={artist.name}
                    genres={artist.genres}
                    images={artist.images}
                />
            )}
        </div>

        
    );
}

export default ArtistsContainer;