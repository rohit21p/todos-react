import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: '5%'
    },
    heading: {
    [theme.breakpoints.up("md")]: {
        fontSize: "1.2rem"
        }
    }
}))

function AddNewTodo() {

    const classes = useStyles();

    const [state, setState] = React.useState({
        todo: {
            title: '',
            body: '',
            due: '',
            label: '',
        },
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
    
    const saveTask = () => {
        axios.post('http://localhost:8000/todos', state.todo, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTkwODU0ODg1fQ.BvNx3lWVZwn50vj1go5Io81dGip3p-REkHyIU5zVvbc' 
            }
        }).then(res => {
            console.log(res);
            setState(state => ({
                ...state,
                snackbar: {
                    show: true,
                    msg: 'Task Saved',
                    color: 'success'
                },
                todo: {
                    title: '',
                    body: '',
                    due: '',
                    label: '',
                },
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

    const saveTaskLocally = () => {
        setState(state => ({
            ...state,
            snackbar: {
                show: true,
                msg: 'Future Feature',
                color: 'info'
            }
        }));
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="body1" className={classes.heading}>Add a new task</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" value={state.todo.title} label="Task Name" margin="normal" onChange={(e) => handleChange(e, 'todo', 'title')}/>
            </Grid>
            {state.todo.title.trim() ? <Grid item xs={12}>
                <TextField variant="outlined" value={state.todo.body} label="Description" multiline margin="normal" rows={4} onChange={(e) => handleChange(e, 'todo', 'body')}/>
            </Grid> : null}
            {state.todo.title.trim() ? <Grid item xs={12}>
                <Button variant="contained" onClick={saveTaskLocally}>
                    Save Locally
                </Button> 
                <Button variant="contained" color="primary" onClick={saveTask}>
                    Save
                </Button>
            </Grid> : null}
            <Snackbar open={state.snackbar.show} autoHideDuration={6000} onClose={() => handleChange({target: {value: false}}, 'snackbar', 'show')}>
                <Alert onClose={() => handleChange({target: {value: false}}, 'title')} severity={state.snackbar.color}>
                    {state.snackbar.msg}
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default AddNewTodo;