import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import SongList from './components/SongList';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';
import './style/style.css';

const client = new ApolloClient({
  dataIdFromObject: o => o.id, // o is referring to object and used it for adding new Lyric
});

// ApolloProvider have to wrap other libriries like react-router
const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
