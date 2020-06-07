import React from 'react';
import Grid from '@material-ui/core/Grid'
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

import Navbar from './components/navbar';
import TopNavbar from './components/topnavbar';
import Login from './components/login';
import Home from './components/home';
import Settings from './components/settings';
import Archive from './components/archive';
import Bin from './components/bin';

const useStyles = makeStyles(theme => ({
  navbarShort: {
      [theme.breakpoints.up('xs')] : {
        display:'none'
      },
      [theme.breakpoints.down('xs')] : {
        display:'block'
      }
  },
  navbarLong: {
    [theme.breakpoints.down('xs')] : {
      display:'none'
    },
    [theme.breakpoints.up('md')] : {
      display:'block'
    }
  }
}))

function App() {

  const classes = useStyles();

  return (
    <Grid container style={{height: '100vh'}}>
      <Grid item xs={3} lg={2} className={classes.navbarLong}>
        <Navbar/>
      </Grid>
      <Grid xs={12} className={classes.navbarShort}>
      <TopNavbar/>
      </Grid>
      <Grid item xs={9} lg={10} style={{overflow: 'auto', height: '100%'}}>
        <Switch>%
          {/* <Route path='/login' component={Login} /> */}
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
