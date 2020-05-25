import React from 'react';
import Grid from '@material-ui/core/Grid'
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/navbar';
import Login from './components/login';
import Home from './components/home';
import Settings from './components/settings';
import Archive from './components/archive';
import Bin from './components/bin';

function App() {
  return (
    <Grid container>
      <Grid item>
        <Navbar />
      </Grid>
      <Grid item>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/settings' component={Settings} />
          <Route path='/archive' component={Archive} />
          <Route path='/bin' component={Bin} />
          <Route exact path='/' component={Home} />
        </Switch>
      </Grid>
    </Grid>
  );
}

export default App;
