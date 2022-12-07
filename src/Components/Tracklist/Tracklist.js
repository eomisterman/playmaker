import React from "react";
import './Tracklist.css';
import Track from '../Track/Track';

class Tracklist extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map((track) =>
                    <Track 
                        name={track.name}
                        album={track.album}
                        artist={track.artist}
                        id={track.id} 
                    />
                )}
            </div>
        );
    }
}

export default Tracklist;