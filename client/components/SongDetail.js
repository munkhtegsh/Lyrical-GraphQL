import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import query from '../queries/fetchSong';
import {Link} from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    console.log(this.props);
    const {song} = this.props.data;

    if (!song) return <div>Loading...</div>;

    return (
      <div>
        <Link to={`/`}>Back</Link>
        <h3> {song.title} </h3>
        <LyricCreate id={this.props.params.id} />
        <LyricList lyrics={song.lyrics} />
      </div>
    );
  }
}

export default graphql(query, {
  options: props => {
    return {variables: {id: props.params.id}};
  },
})(SongDetail); //be carefule with passing :id into query!
