import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import CopyrightIcon from '@material-ui/icons/Copyright';
import ArchiveIcon from '@material-ui/icons/Archive';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Login from './login'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white'
  },
  route: {
      textDecoration: 'none',
      color: 'black'
  }
}));

const routes = [
    {
        title: 'Home',
        route: '/',
        icon: <HomeIcon fontSize="small" style={{margin: '10px'}}/>
    },
    {
        title: 'Archive',
        route: '/archive',
        icon: <ArchiveIcon fontSize="small"  style={{margin: '10px'}}/>
    },
    {
        title: 'Bin',
        route: '/bin',
        icon: <DeleteIcon fontSize="small"  style={{margin: '10px'}}/>
    },
    {
        title: 'Settings',
        route: '/settings',
        icon: <SettingsIcon fontSize="small"  style={{margin: '10px'}}/>
    },
]

function TopNavbar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
      props.logout();
      handleClose();
  }

  const login = () => {
    handleClickOpen();
    handleClose();
  }

  const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={handleClick} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {routes.map(route => 
            (<Link to={route.route} className={classes.route}>
                <MenuItem onClick={handleClose}>{route.icon}{route.title}</MenuItem>
            </Link>)
            )}
            {!props.loggedIn ? <MenuItem onClick={login}><VpnKeyIcon  style={{margin: '10px'}}/>Login</MenuItem> :
            <MenuItem onClick={logout}><ExitToAppIcon  style={{margin: '10px'}}/>Logout</MenuItem>}
            <MenuItem onClick={handleClose}><CopyrightIcon  style={{margin: '10px'}}/>Rohit Panjwani</MenuItem>
        </Menu>
          <Typography variant="h6" className={classes.title}>
            Rohit Panjwani
          </Typography>
        </Toolbar>
        <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"md"}
            >
            <DialogContent>
                <Login close={handleCloseDialog}/>
            </DialogContent>
            </Dialog>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
    loggedIn: state.loggedIn,
    username: state.username
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch({type: 'LOGOUT'})
})


export default connect(mapStateToProps, mapDispatchToProps)(TopNavbar);