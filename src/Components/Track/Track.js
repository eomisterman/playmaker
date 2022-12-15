import React from "react";
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            audio: null
        }

        this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.playPreview = this.playPreview.bind(this);
        this.stopPreview = this.stopPreview.bind(this);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    renderAction() {
        let action = this.props.isRemoval ? (
            <button 
                className="Track-action"
                onClick={this.removeTrack}>-</button>) : (
            <button 
                className="Track-action" 
                onClick={this.addTrack}>+</button>);
        return (action);
    }

    playPreview() {
        const audio = new Audio(this.props.track.preview);
        audio.play()
            .then(() => {
                console.log(`${this.props.track.name} currently playing`);
            })
            .catch((error) => {
                console.log(error);
            })
        this.setState({ audio: audio })
    }

    stopPreview() {
        if (!this.state.audio) return;

        this.state.audio.pause();
        this.setState({ audio: null })
    }

    render() {
        return (
            <div className="Track" onMouseEnter={this.playPreview} onMouseLeave={this.stopPreview}>
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

export default Track;