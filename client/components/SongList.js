import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class SongList extends Component {
  renderSongs() {
    // another way to solve Loading issue
    // if (typeof this.props.data.songs === 'undefined') {
    //   return <div> LOading </div>;
    // }
    return this.props.data.songs.map(song => {
      return (
        <li key={song.id} className="collection-item">
          {song.title}
        </li>
      );
    });
  }

  render() {
    console.log(this.props);
    if (this.props.data.loading) {
      return <div>Loading ... </div>;
    }
    return (
      <ul className="collection blue-text text-darken-2">
        {this.renderSongs()}
      </ul>
    );
  }
}

// identifying query
const query = gql`
  query {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
