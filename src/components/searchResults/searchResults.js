import React from 'react';
import TrackList from '../trackList/trackList';
import './searchResults.css'

class SearchResults extends React.Component {
    // Renders the tracks returned in the search results
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList 
                    tracks={this.props.searchResults}
                    onAdd={this.props.onAdd}
                    isRemoval={false}
                />
            </div>            
        )
    }
}

export default SearchResults;