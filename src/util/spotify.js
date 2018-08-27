const clientID = 'c4b1c8c17acb4680acd2aadc2e3cd540';
const redURI = 'http://localhost:3000/';
let accessToken = '';

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }
        const url = window.location.href;
        //console.log(url);
        const regexFound1 = url.match(/access_token=([^&]*)/);
        const regexFound2 = url.match(/expires_in=([^&]*)/);
        if(!accessToken && !regexFound1) {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redURI}`;
        }
        accessToken = regexFound1[1];
        //console.log(accessToken);
        const expiresIn = regexFound2[1];
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
    },

    search(q) {
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${q}`,
        {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json();
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
        Spotify.getAccessToken();
        if(!playlistName && !trackURIs) {
            return;
        }
        const headers = {
                        Authorization: `Bearer ${accessToken}`, 
                        'Content-Type': 'application/json'
                        };
        let userID = '';
        let playlistID = '';

        return fetch(`https://api.spotify.com/v1/me`, 
        {
            headers: headers
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.id) {
                userID = jsonResponse.id;
            }
            //console.log(userID);
        }).then(
            //console.log(userID);
            fetch(`https://api.spotify.com/v1/users/user_id=${userID}/playlists`, 
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify(
                {
                    "name": playlistName,
                    "description": "New playlist description",
                    "public": true
                }
                )   
            }).then(response => {
                console.log(response.json());
                return response.json();
            }).then(jsonResponse => {
                if(jsonResponse.id) {
                    playlistID = jsonResponse.id;
                }
                //console.log(playlistID);
            })
        ).then(
            fetch(`https://api.spotify.com/v1/playlists/playlist_id=${playlistID}/tracks`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify(
                {
                    "uris": trackURIs
                }
                )
            }).then(response => {
                console.log(response.json());
                return response.json();
            }).then(jsonResponse => {
                if(jsonResponse.id) {
                    playlistID = jsonResponse.id;
                }
            })
        );
    }
}

export default Spotify;