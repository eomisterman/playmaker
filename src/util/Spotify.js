const clientID = '5084645426d2429a8ef352a99ba328b3';
const redirectURI = 'http://localhost:3000/';
const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
let accessToken;

const Spotify = {
    accessUrl: `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`,

    getAccessToken() {
        // if (accessToken) {
        //     console.log(accessToken);
        //     return accessToken;
        // }

        const accessTokenMatch = window.location.href.match('access_token=([^&]*)&');
        const expiresInMatch = window.location.href.match('expires_in=([^&]*)');

        if (accessTokenMatch && expiresInMatch) {
            let passedAccessToken = accessTokenMatch[1];
            const expiresIn = expiresInMatch[1];

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return passedAccessToken;
        } else {;
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = window.localStorage.getItem('token');
        console.log(`search token: ${accessToken}`)

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
    }
};

export default Spotify;