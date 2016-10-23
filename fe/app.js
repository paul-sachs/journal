import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import Wrapper from './components/wrapper';
import StarWarsApp from './components/star-wars-app';
import Login from './components/login';
// import StarWarsAppHomeRoute from './routes/home-route';
import { Router, Route, IndexRoute, applyRouterMiddleware, browserHistory } from 'react-router';
import useRelay from 'react-router-relay';
import auth from './util/auth';

const indexRoute = {
  factions: () => Relay.QL`query { factions(names: ["empire","rebels"]) }`
};

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

ReactDOM.render(
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  >
    <Route path="/"
      component={Wrapper}>
      <IndexRoute
        component={StarWarsApp}
        queries={indexRoute}
        onEnter={requireAuth}/>
      <Route
        path="login"
        component={Login}/>
      />
    </Route>
  </Router>,
  // <Relay.RootContainer
  //   Component={StarWarsApp}
  //   route={new StarWarsAppHomeRoute({
  //     factionNames: ['empire', 'rebels'],
  //   })}
  // />,
  document.getElementById('root')
);
