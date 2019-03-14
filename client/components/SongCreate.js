import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router';
import query from '../queries/fetchSongs';

// it is a child component of SongList
class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {title: ''};
  }

  submit(e) {
    e.preventDefault();

    console.log(this.props);
    // invoking mutate fn and passing title state
    this.props
      .mutate({
        variables: {title: this.state.title},
        refetchQueries: [{query}], // you may have to refetch when you insert new data
      })
      .then(() => hashHistory.push('/'));
  }

  // you can use enter key or click on Submit btn on Form
  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={e => this.submit(e)}>
          <label>Song Title:</label>
          <input
            onChange={e => this.setState({title: e.target.value})}
            value={this.state.value}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);

// query variables example

// mutation Addsong($title: String) {
//   addSong(title: $title) {
//     id
//     title
//   }
// }
//------------------------------
// {
//   "title": "Sptite vs Coke"
// }
