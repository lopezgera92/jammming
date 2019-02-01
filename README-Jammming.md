# Jammming
Jammming is a web application built using the React framework. It allows users to search the Spotify library, create a custom playlist,and then save the custom playlist to their Spotify account. The first time a user searches for a song, album, or artist, Jammming redirects the user to log into their Spotify account. 

A user can type the name of a song, artist, or album into the search bar and click the SEARCH button to request song data from the Spotify library. Jammming then displays a list of returned tracks from the users query. Tracks can be added or removed by clicking the (+) and (-) buttons, respectively. Users also have the ability to change the name of the playlist to something of their choice before clicking the SAVE TO SPOTIFY button.

![Static Application](/Users/Gera/Desktop/Screen\ Shot\ 2019-01-31\ at\ 4.58.18\ PM.png)
Format: ![Alt Text](url)

![Dynamic Application](/Users/Gera/Desktop/Screen\ Shot\ 2019-01-31\ at\ 5.00.17\ PM.png)
Format: ![Alt Text](url)



### Prerequisites
* [Node.js](https://nodejs.org/en/) - The runtime environment used
* [npm](https://www.npmjs.com/) - The default package manager for Node.js


### Installing
* Using your Command Line Interface (CLI) type the command "node -v" to check if you have Node.js installed on your machine
* If Node is not installed on your machine, visit the Node website linked above and download the latest version of Node.js
* npm is distributed with with Node.js - meaning that when you download Node.js, you automatically get npm installed on your machine
* To confirm that you have npm installed you can type the command "npm -v" in your CLI

* To install the necessary dependencies to run the application, type the command "npm install" in your CLI
* To run the application type the command "npm start" into your CLI to begin the react script start
* If the application does not open automatically, type "http://localhost:3000/" into your browser


## Built With
* [React](https://reactjs.org/docs/getting-started.html) - The web framework used
* [npm](https://www.npmjs.com/) - Dependency Management


## Authors
I implemented each component of the application, along with the calls to the Spotify endpoints. Codecademy.com provided the styling/structure of the application
* **Gerardo Lopez** - app.js, playlist.js, searchBar.js, searchResults.js, track.js, trackList.js, spotify.js
* **Codecademy.com** - favicon.ico, index.html, manifest.json, reset.css, app.css, playlist.css, searchBar.css, searchResults.css,track.css, trackList.css, index.css, index.js, registerServiceWorker.js