import React from 'react';
import Grid from '@material-ui/core/Grid'
import { Typography, Paper, makeStyles } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RestoreIcon from '@material-ui/icons/Restore';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import EventIcon from '@material-ui/icons/Event';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    todo: {
        overflow: 'hidden',
        wordWrap: 'break-word',
        padding: '5%',
        height: '100%'
    },
    option: {
        cursor: 'pointer',
        color: 'black',
        margin: '5px'
    },
    label: {
        backgroundColor: 'lightblue',
        padding: '5px',
        margin: '15px',
        borderRadius: '15%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '1.2rem'
    }
}))

function Todo(props) {

    const classes = useStyles()

    const [state, setState] = React.useState({
        snackbar: {
            show: false,
            msg: '',
            color: 'success'
        }
    })

    const handleChange = (e, key, prop) => {
        let value = e.target.value;
        setState(state => ({
            ...state,
            [key]: {
                ...state[key],
                [prop]: value
            }
        }))
    }

    const togglePin = () => {
        let url = 'http://localhost:8000/' + (props.pinned ? 'unpin' : 'pin');
        axios.post(url, {
            _id: props.task._id
        }, {
            headers: {
                Authorization: 'Bearer ' + props.token 
            }
        }).then(res => {
            console.log(res)
            let task = {...props.task, pinned: true}
            if (props.pinned) {
                props.unpin(task, props.index)
            } else {
                props.pin(task, props.index)
            }
        }).catch(err => {
            if (err.response && err.response.status === 403) {
                props.logout();
                setState(state => ({
                    ...state,
                    snackbar: {
                        show: true,
                        msg: 'Login To Use This Feature',
                        color: 'error'
                    }
                }));
            } else {
                setState(state => ({
                    ...state,
                    snackbar: {
                        show: true,
                        msg: 'Some Error Occurred',
                        color: 'error'
                    }
                }));
            }
        })
    }

    const deletePin = () => {
        let url = 'http://localhost:8000/todo'
        console.log(url, props.pinned)
        axios.delete(url, {
            headers: {
                Authorization: 'Bearer ' + props.token 
            },
            data: {
                _id: props.task._id
            },
        },).then(res => {
            props.delete(props.pinned, props.index);
            setState(state => ({
                ...state,
                snackbar: {
                    show: true,
                    msg: 'Task Deleted',
                    color: 'success'
                }
            }));
        }).catch(err => {
            console.log(err);
            if (err.response && err.response.status === 403) {
                props.logout();
                setState(state => ({
                    ...state,
                    snackbar: {
                        show: true,
                        msg: 'Login To Use This Feature',
                        color: 'error'
                    }
                }));
            } else {
                setState(state => ({
                    ...state,
                    snackbar: {
                        show: true,
                        msg: 'Some Error Occurred',
                        color: 'error'
                    }
                }));
            }
        })
    }

    const archivePin = () => {
        let url = 'http://localhost:8000/archive'
        console.log(url, props.pinned)
        axios.post(url, {
                _id: props.task._id
            }, {
            headers: {
                Authorization: 'Bearer ' + props.token 
            },
        },).then(res => {
            props.archive(props.pinned, props.index);
            setState(state => ({
                ...state,
                snackbar: {
                    show: true,
                    msg: 'Task Archived',
                    color: 'success'
                }
            }));
        }).catch(err => {
            console.log(err);
            if (err.response && err.response.status === 403) {
                props.logout();
                setState(state => ({
                    ...state,
                    snackbar: {
                        show: true,
                        msg: 'Login To Use This Feature',
                        color: 'error'
                    }
                }));
            } else {
                setState(state => ({
                    ...state,
                    snackbar: {
                        show: true,
                        msg: 'Some Error Occurred',
                        color: 'error'
                    }
                }));
            }
        })
    }

    const addPin = () => {
        let url = 'http://localhost:8000/todos'
        let body = {...props.task}
        delete body._id;
        axios.post(url, body, {
            headers: {
                Authorization: 'Bearer ' + props.token 
            },
        }).then(res => {
            setState(state => ({
                ...state,
                snackbar: {
                    show: true,
                    msg: 'Task Restored',
                    color: 'success'
                }
            }));
            props.restore(props.index)
        }).catch(err => {
            console.log(err);
            if (err.response && err.response.status === 403) {
                props.logout();
                setState(state => ({
                    ...state,
                    snackbar: {
                        show: true,
                        msg: 'Login To Use This Feature',
                        color: 'error'
                    }
                }));
            } else {
                setState(state => ({
                    ...state,
                    snackbar: {
                        show: true,
                        msg: 'Some Error Occurred',
                        color: 'error'
                    }
                }));
            }
        })
    }

    return (
        <Tooltip title={
            props.archived ? "Status: Completed" : "Status: Incomplete"
        } arrow placement="right">
            <Paper elevation={5}>
                <Grid container className={classes.todo}>
                    <Grid item xs={12} style={{marginBottom: '5%'}}>
                        <span className={classes.title}>{props.task.title}</span>
                        {props.task.label ? <span className={classes.label}>{props.task.label}</span> : null}
                    </Grid>
                    {/* <Grid item xs={12} style={{marginBottom: '5%'}}>
                        {props.task.label}
                    </Grid> */}
                    <Grid item xs={12} style={{marginBottom: '5%'}}>
                        {props.task.body}
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: '5%'}}>
                        <i><span style={{fontFamily:'monospace'}}>Due on {props.task.due ? (new Date(props.task.due)).toString() : null}</span></i>
                    </Grid>
                    {!(props.bin || props.archived) ? <Grid item xs={12}>
                        {props.pinned ? 
                        <Tooltip title="Remove from favourites" arrow>
                            <FavoriteIcon className={classes.option}  onClick={togglePin} fontSize="medium"/> 
                        </Tooltip>:
                        <Tooltip title="Add to favourites" arrow>
                            <FavoriteBorderIcon className={classes.option} onClick={togglePin} fontSize="medium"/>
                        </Tooltip>}
                        <Tooltip title="Delete the task" arrow>
                            <DeleteOutlineIcon className={classes.option} onClick={deletePin} fontSize="medium" />
                        </Tooltip>
                        <Tooltip title="Change Status to Completed" arrow>
                            <CheckCircleOutlineIcon className={classes.option} onClick={archivePin} fontSize="medium" />
                        </Tooltip>
                        <Tooltip title="Add to google calendar" arrow>
                            <a 
                            href={"https://calendar.google.com/calendar/r/eventedit?" +
                            "text=" + props.task.title +
                            "&details" + props.task.body +
                            "&location=todoapp&details&sf=true"}
                            target="_blank">
                                <EventIcon className={classes.option} fontSize="medium" />
                            </a>
                        </Tooltip>
                    </Grid> : props.archived ? null :
                    <Grid item xs={12}>
                        <Tooltip title="Restore" arrow>
                            <RestoreIcon className={classes.option} onClick={addPin} fontSize="medium" />
                        </Tooltip>
                    </Grid>}
                </Grid>
                <Snackbar open={state.snackbar.show} autoHideDuration={6000} onClose={() => handleChange({target: {value: false}}, 'snackbar', 'show')}>
                    <Alert onClose={() => handleChange({target: {value: false}}, 'title')} severity={state.snackbar.color}>
                        {state.snackbar.msg}
                    </Alert>
                </Snackbar>
            </Paper>
        </Tooltip>
    );
}


const mapStateToProps = (state) => ({
    token: state.token
})


const mapDispatchToProps = (dispatch) => ({
    delete: (pinned, index) => dispatch({type: 'DELETE', payload: {pinned, index}}),
    archive: (pinned, index) => dispatch({type: 'ARCHIVE', payload: {pinned, index}}),
    restore: (index) => dispatch({type: 'RESTORE', payload: {index}}),
    restore_archived:  (index) => dispatch({type: 'RESTORE_ARCHIVED', payload: {index}}),
    pin: (task, index) => dispatch({type: 'PIN', payload: {task, index}}),
    unpin: (task, index) => dispatch({type: 'UNPIN', payload: {task, index}}),
    logout: () => dispatch({type: 'LOGOUT'})
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo);