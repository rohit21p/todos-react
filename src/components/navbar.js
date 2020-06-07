import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import CopyrightIcon from '@material-ui/icons/Copyright';
import ArchiveIcon from '@material-ui/icons/Archive';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { connect } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Login from './login'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        width: '100%'
    },
    route: {
        textDecoration: 'none',
        color: 'black'
    }
}))

const routes = [
    {
        title: 'Home',
        route: '/',
        icon: <HomeIcon />
    },
    {
        title: 'Archive',
        route: '/archive',
        icon: <ArchiveIcon />
    },
    {
        title: 'Bin',
        route: '/bin',
        icon: <DeleteIcon />
    },
    {
        title: 'Settings',
        route: '/settings',
        icon: <SettingsIcon />
    },
]

function Navbar(props) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Paper elevation={3} className={classes.root}>
            <List>
                <ListItem button>
                    <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                    <ListItemText primary={props.username ? props.username.toUpperCase() : 'GUEST' } />
                </ListItem>
            </List>
            <Divider />
            <List>
                {routes.map((route, index) => (
                    <Link to={route.route} className={classes.route}>
                        <ListItem button key={route.title}>
                            <ListItemIcon>{route.icon}</ListItemIcon>
                            <ListItemText primary={route.title} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            {!props.loggedIn ? <List>
                <ListItem button onClick={handleClickOpen}>
                    <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                    <ListItemText primary="Login" />
                </ListItem>
            </List> :
            <List>
                <ListItem button onClick={props.logout}>
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>}
            <Divider />
            <List>
                {['Rohit Panjwani'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon><CopyrightIcon /></ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"md"}
            >
            <DialogContent>
                <Login close={handleClose}/>
            </DialogContent>
            </Dialog>
        </Paper>
    );
}

const mapStateToProps = (state) => ({
    loggedIn: state.loggedIn,
    username: state.username
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch({type: 'LOGOUT'})
})


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);