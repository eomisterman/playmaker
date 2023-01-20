import './Artist.css';
import React from "react";

const Artist = (props) => {
    return (
        <div className='Artist' id={props.key}>
            <img src={props.images[2].url} alt={props.name} />
            <h3>{props.name}</h3>
            {props.genres.map(genre => <p>{genre}</p>)}
        </div>
    );
}

export default Artist;