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
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
        title: 'Login',
        route: '/login',
        icon: <VpnKeyIcon />
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

function Navbar() {

    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.root}>
            <List>
                <ListItem button>
                    <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                    <ListItemText primary="Guest Account" />
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
            <List>
                {['Rohit Panjwani'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon><CopyrightIcon /></ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default Navbar;