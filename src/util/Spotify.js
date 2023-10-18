export const redirectURI = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://playmakerspotify.com/';
const clientID = '5084645426d2429a8ef352a99ba328b3';
const scopes = [
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private',
  'streaming',
  'user-modify-playback-state',
  'user-read-playback-state',
  'user-library-read',
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-recently-played',
];

const Spotify = {
  accessUrl: `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=${scopes.join(' ')}&redirect_uri=${redirectURI}`,

  search(term) {
    const accessToken = window.localStorage.getItem('token');

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => response.json()).then((jsonResponse) => {
      if (!jsonResponse.tracks) {
        return Error(jsonResponse.error.message);
      }
      return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        preview: track.preview_url,
      }));
    });
  },

  savePlaylist(playlistName, trackURIs) {
    if (playlistName && trackURIs.length) {
      const token = window.localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let userID;

      return fetch('https://api.spotify.com/v1/me', {
        headers,
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          userID = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ name: playlistName }),
          });
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
          const playlistID = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ uris: trackURIs, position: 0 }),
          });
        });
    }
    return null;
  },

  topTracks() {
    const token = window.localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers,
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse) {
          return null;
        }
        const { items } = jsonResponse;
        return items.map((item) => ({
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          album: item.album.name,
          uri: item.uri,
          preview: item.preview_url,
          images: item.album.images,
        }));
      });
  },

  topArtists1() {
    const token = window.localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return fetch('https://api.spotify.com/v1/me/top/artists', {
      headers,
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse) {
          return null;
        }
        const { items } = jsonResponse;
        return items.map((item) => ({
          id: item.id,
          name: item.name,
          type: item.type,
          popularity: item.popularity,
          followers: item.followers.total,
          genres: item.genres,
          uri: item.uri,
          images: item.images,
        }));
      });
  },

  topArtists() {
    const token = window.localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return fetch('https://api.spotify.com/v1/me/top/artists', {
      headers,
    })
      .then((response) => {
        if (response.status === 401) {
          window.location.href = Spotify.accessUrl;
          return [];
        }
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse) {
          return null;
        }
        const { items } = jsonResponse;
        return items.map((item) => ({
          id: item.id,
          name: item.name,
          type: item.type,
          popularity: item.popularity,
          followers: item.followers.total,
          genres: item.genres,
          uri: item.uri,
          images: item.images,
        }));
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  },

  getPlaylists() {
    const token = window.localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    let userID;

    return fetch('https://api.spotify.com/v1/me', {
      headers,
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse) return null;
        userID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers,

        });
      })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse) return null;
        return jsonResponse.items.map((item) => ({
          id: item.id,
          name: item.name,
          href: item.href,
          uri: item.uri,
          collaborative: item.collaborative,
          public: item.public,
          type: item.type,
          images: item.images,
          tracks: item.tracks,
        }));
      });
  },

  getPlaylistTracks(playlistID) {
    const token = window.localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return fetch(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      { headers },
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.items) {
          return Error(jsonResponse.error.message);
        }
        return jsonResponse.items.map((item) => ({
          id: item.track.id,
          name: item.track.name,
          artist: item.track.artists[0].name,
          album: item.track.album.name,
          uri: item.track.uri,
          preview: item.track.preview_url,
          images: item.track.album.images,
        }));
      }).catch((error) => {
        console.error(error);
      });
  },
};

export default Spotify;
