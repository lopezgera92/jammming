const clientID = 'c4b1c8c17acb4680acd2aadc2e3cd540';
const redURI = 'http://localhost:3000/';
let accessToken = '';
let expiresIn = '';

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }
        const url = window.location.href;
        //console.log(url);

        if(url.match(/access_token=([^&]*)/) && url.match(/expires_in=([^&]*)/)) {
            const regexFound1 = url.match(/access_token=([^&]*)/);
            const regexFound2 = url.match(/expires_in=([^&]*)/);
            accessToken = regexFound1[1];
            expiresIn = regexFound2[1];
            //console.log(accessToken);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }
        else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redURI}`;
        }
    },

    search(q) {
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${q}`,
        {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            if(response.ok) {
                return response.json();
            }
        }).then(jsonResponse => {
            if(jsonResponse.tracks) {
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            }
        }); 
    },

    savePlaylist(playlistName,trackURIs) {
        let accessToken = Spotify.getAccessToken();
        if(!playlistName || !trackURIs) {
            return;
        }
        const headers = {
                        Authorization: `Bearer ${accessToken}`//, 
                        //'Content-Type': 'application/json'
                        };
        let userID = '';
        let playlistID = '';

        return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
            if (response.ok) {
              return response.json();
            }
          }).then(jsonResponse => {
            userID = jsonResponse.id;
            //console.log(userId);
      
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
              method: 'POST',
              headers: {Authorization: `Bearer ${accessToken}`,'Content-type': 'application/json'},
              body: JSON.stringify({name: playlistName})
            }).then(response => {
              return response.json();
            }).then(jsonResponse => {
              playlistID = jsonResponse.id;
      
              return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                method: 'POST',
                headers: {Authorization: `Bearer ${accessToken}`,'Content-type': 'application/json'},
                body: JSON.stringify({uris: trackURIs})
              }).then(response => {
                return response.json();
              }).then(jsonResponse => {
                playlistID = jsonResponse.id;
                //console.log(jsonResponse);
              });
            });
          });
    }
}

export default Spotify;