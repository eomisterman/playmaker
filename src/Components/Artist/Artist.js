import './Artist.css';
import React from "react";

const Artist = (props) => {
    return (


        <div className='Artist' id={props.id} key={props.id}>
            <img src={props.images.at(-2).url} alt={props.name} />
            <div id="artist-details">
                <h3>{props.index+1}. {props.name}</h3>
                {props.genres.map((genre, index) => (
                    <p key={index}>{genre}</p>
                ))}
            </div>
        </div>


    );
}

export default Artist;