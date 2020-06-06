import React from 'react';
import Grid from '@material-ui/core/Grid'
import { Typography, Paper, makeStyles } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import RestoreIcon from '@material-ui/icons/Restore';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';


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
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTkwODU0ODg1fQ.BvNx3lWVZwn50vj1go5Io81dGip3p-REkHyIU5zVvbc' 
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
            console.log(err)
        })
    }

    const deletePin = () => {
        let url = 'http://localhost:8000/todo'
        console.log(url, props.pinned)
        axios.delete(url, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTkwODU0ODg1fQ.BvNx3lWVZwn50vj1go5Io81dGip3p-REkHyIU5zVvbc' 
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
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTkwODU0ODg1fQ.BvNx3lWVZwn50vj1go5Io81dGip3p-REkHyIU5zVvbc' 
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
            props.restore(props.task, props.index)
        }).catch(err => {
            console.log(err);
            if (err.response && err.response.status === 403) {
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
        <Paper elevation={5}>
            <Grid container className={classes.todo}>
                <Grid item xs={12} style={{marginBottom: '5%'}}>
                    {props.task.title}
                </Grid>
                <Grid item xs={12} style={{marginBottom: '5%'}}>
                    {props.task.body}
                </Grid>
                {!props.bin ? <Grid item xs={12}>
                    {props.pinned ? 
                    <FavoriteIcon className={classes.option} onClick={togglePin} fontSize="small"/> :
                    <FavoriteBorderIcon className={classes.option} onClick={togglePin} fontSize="small"/>}
                    <DeleteOutlineIcon className={classes.option} onClick={deletePin} fontSize="small" />
                </Grid> : 
                <Grid item xs={12}>
                    <RestoreIcon className={classes.option} onClick={addPin} fontSize="small" />
                </Grid>}
            </Grid>
            <Snackbar open={state.snackbar.show} autoHideDuration={6000} onClose={() => handleChange({target: {value: false}}, 'snackbar', 'show')}>
                <Alert onClose={() => handleChange({target: {value: false}}, 'title')} severity={state.snackbar.color}>
                    {state.snackbar.msg}
                </Alert>
            </Snackbar>
        </Paper>
    );
}


const mapStateToProps = (state) => ({
})


const mapDispatchToProps = (dispatch) => ({
    delete: (pinned, index) => dispatch({type: 'DELETE', payload: {pinned, index}}),
    restore: (pinned, index) => dispatch({type: 'RESTORE', payload: {pinned, index}}),
    pin: (task, index) => dispatch({type: 'PIN', payload: {task, index}}),
    unpin: (task, index) => dispatch({type: 'UNPIN', payload: {task, index}}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo);