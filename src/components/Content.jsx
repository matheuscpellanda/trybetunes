import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import NotFound from '../pages/NotFound';

class Content extends React.Component {
  render() {
    return (
      <main className="Content">
        <Switch>
          <Route exact path="/trybetunes/" component={ Login } />
          <Route exact path="/trybetunes/search" component={ Search } />
          <Route exact path="/trybetunes/album/:id" component={ Album } />
          <Route exact path="/trybetunes/favorites" component={ Favorites } />
          <Route exact path="/trybetunes/profile" component={ Profile } />
          <Route exact path="/trybetunes/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default Content;
