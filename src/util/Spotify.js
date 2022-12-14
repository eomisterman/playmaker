const Spotify = {
    clientID: '5084645426d2429a8ef352a99ba328b3',

    redirectURI: 'https://playmakerspotify.com/',

    accessUrl: `https://accounts.spotify.com/authorize?client_id=${this.clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${this.redirectURI}`,

    search(term) {
        const accessToken = window.localStorage.getItem('token');

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    save(playlistName, trackURIs) {
        if (playlistName && trackURIs.length) {
            const token = window.localStorage.getItem('token');
            let headers = {
                Authorization: `Bearer ${token}`
            }
            let userID;

            return fetch('https://api.spotify.com/v1/me', {
                headers: headers
            })
            .then(response => response.json())
            .then(jsonResponse => {
                userID = jsonResponse.id;
                console.log(trackURIs);
                return fetch(`https://api.spotify.com/v1/users/12150517711/playlists`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ name: playlistName })
                })
            })
            .then(response => response.json())
            .then(jsonResponse => {
                const playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ uris: trackURIs, position: 0 })
                })
            })
        } else {
            return;
        }
    }
};

export default Spotify;