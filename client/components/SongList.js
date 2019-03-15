import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link} from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {
  constructor(props) {
    super(props);
  }

  //using mutation
  deleteSong(id) {
    console.log(this.props);
    this.props
      .mutate({
        variables: {id},
      })
      .then(() => this.props.data.refetch()); // aumotamically re-exectute any queries that assocciated with the component
  }

  renderSongs() {
    // another way to solve Loading issue
    // if (typeof this.props.data.songs === 'undefined') {
    //   return <div> Loading </div>;
    // }

    // this.props.data.songs fetches songs from graphql server
    return this.props.data.songs.map(({id, title}) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`songs/${id}`}>{title}</Link>
          <i className="material-icons" onClick={() => this.deleteSong(id)}>
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    console.log(this.props);
    // if data loading is true in graphql then show loading ...
    if (this.props.data.loading) {
      return <div>Loading ... </div>;
    }
    return (
      <div>
        <ul className="collection blue-text text-darken-2">
          {this.renderSongs()}
        </ul>
        <Link to="/songs/new">
          <button className="btn-floating btn-large red right">
            <i className="material-icons">add</i>
          </button>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation deleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;
// similar to redux using HOC
export default graphql(mutation)(graphql(query)(SongList));
