import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class LyricList extends Component {
  onLike(id, likes) {
    console.log(this.props);
    this.props.likeLyric({
      variables: {id},
      optimisticResponse: {
        // handling optimistic responses check devtool network
        __typename: 'Mutations',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes + 1,
        },
      },
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({id, content, likes}) => (
      <li className="collection-item" key={id}>
        {content}
        <div className="vote-box">
          <i onClick={() => this.onLike(id, likes)} className="material-icons">
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    ));
  }

  render() {
    return <ul className="collection"> {this.renderLyrics()} </ul>;
  }
}

const mutation = gql`
  mutation LikeLyrics($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation, {name: 'likeLyric'})(LyricList); //it auto documents the mutation, makes it easier to read and reminds you what is being mutated without having to track down the mutation!
