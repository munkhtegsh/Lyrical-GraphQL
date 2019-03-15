import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import fetchLyrics from '../queries/fetchLyrics';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  submit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {content: this.state.content, songId: this.props.id},
        refetchQueries: [{fetchLyrics}],
      })
      .then(() => this.setState({content: ''}));
  }

  render() {
    return (
      <form onSubmit={e => this.submit(e)}>
        <label> Add a Lyric </label>
        <input onChange={e => this.setState({content: e.target.value})} />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(graphql(fetchLyrics)(LyricCreate));
