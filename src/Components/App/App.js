import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

function App() {
    const [ token, setToken ] = useState('');
    useEffect(() => {
        const hash = window.location.hash;
        let spotifyToken = window.localStorage.getItem("token");
        let timeoutID;
        console.log("useEffect")

        if(!token && spotifyToken) {
            setToken(spotifyToken);
        }

        if (!spotifyToken && hash) {
            spotifyToken = hash.match('access_token=([^&]*)&')[1];
            let tokenExpiration = hash.match('expires_in=([^&]*)')[1];

            window.location.href = "";
            window.localStorage.setItem('token', spotifyToken);
            window.localStorage.setItem('expiresIn', tokenExpiration);

            timeoutID = setTimeout(() => {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('expiresIn');
            }, tokenExpiration * 1000);

            setToken(spotifyToken);
        }
        return () => {
            clearTimeout(timeoutID);
        };
    }, [token, setToken])

    const [ searchResults, setSearchResults ] = useState([]);
    const search = (searchTerm) => {
        Spotify.search(searchTerm).then(result => {
            setSearchResults(result);
          }).catch((error) => {
            console.log(error);
          });
    }

    const [ playlistName, setPlaylistName ] = useState('Playlist Name...');
    const updatePlaylistName = (name) => {
        setPlaylistName(name);
    }

    const [ playlistTracks, setPlaylistTracks ] = useState([]);
    const addTrack = (track) => {
        setPlaylistTracks(prev => [track, ...prev]);
    }
    const removeTrack = (track) => {
        setPlaylistTracks(prev => prev.filter(song => song.id !== track.id));
    }

    const savePlaylist = () => {
        let trackURIs = playlistTracks.map(track => track.uri );
        Spotify.save(playlistName, trackURIs).then(() => {
            setPlaylistName("Playlist Name...");
            setPlaylistTracks([]);
        });
    }

    if (!token) {
        return (
            <div>
                <h1>Play<span className="highlight">list</span>maker</h1>
                <div className="App">
                    <a href={Spotify.accessUrl} className="Button-spotify" >Login in with Spotify</a>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1>Play<span className="highlight">list</span>maker</h1>
            <div className="App">
                <SearchBar onSearch={search} />
                <div className="App-playlist">
                    <SearchResults 
                        searchResults={searchResults} 
                        onAdd={addTrack} />
                    <Playlist 
                        playlistName={playlistName} 
                        onNameChange={updatePlaylistName}
                        playlistTracks={playlistTracks}
                        onRemove={removeTrack}
                        onSave={savePlaylist} />
                </div>
            </div>
        </div>
    );
}

export default App;