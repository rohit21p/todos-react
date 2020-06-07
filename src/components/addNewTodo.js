import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button, Tooltip } from '@material-ui/core';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";


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

function AddNewTodo(props) {

    const classes = useStyles();

    const [state, setState] = React.useState({
        todo: {
            title: '',
            body: '',
            label: '',
        },
        snackbar: {
            show: false,
            msg: '',
            color: 'success'
        }
    })

    let tomorrow = new Date();
    (tomorrow).setDate((tomorrow).getDate() + 1)
    const [selectedDate, handleDateChange] = React.useState(tomorrow);

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
        console.log(selectedDate, typeof selectedDate)
        let todo = {
            ...state.todo,
            due: new Date(selectedDate)
        }
        axios.post('https://126b4yhy70.execute-api.ap-south-1.amazonaws.com/production//todos', todo, {
            headers: {
                Authorization: 'Bearer ' + props.token 
            }
        }).then(res => {
            console.log(res);
            props.save({
                ...todo,
                _id: res.data._id,
            })
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
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="body1" className={classes.heading}>Add a new task</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" value={state.todo.title} label="Task Name" margin="normal" onChange={(e) => handleChange(e, 'todo', 'title')}/>
            </Grid>
            {state.todo.title.trim() ? <Grid item xs={12}>
                <TextField variant="outlined" value={state.todo.label} label="Task Label" margin="normal" onChange={(e) => handleChange(e, 'todo', 'label')}/>
            </Grid> : null}
            {state.todo.title.trim() ? <Grid item xs={12}>
                <TextField variant="outlined" value={state.todo.body} label="Description" multiline margin="normal" rows={4} onChange={(e) => handleChange(e, 'todo', 'body')}/>
            </Grid> : null}
            {state.todo.title.trim() ? <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        label="Due Date"
                        inputVariant="outlined"
                        value={selectedDate}
                        onChange={handleDateChange}
                        margin="normal"
                    />
                </MuiPickersUtilsProvider>
            </Grid> : null}
            {state.todo.title.trim() ? <Grid item xs={12}>
                <Tooltip title={props.loggedIn ? "Save" : "Login to use this feature"}>
                    <Button variant="contained" color="primary" onClick={saveTask} disabled={!props.loggedIn}>
                        Save
                    </Button>
                </Tooltip>
            </Grid> : null}
            <Snackbar open={state.snackbar.show} autoHideDuration={6000} onClose={() => handleChange({target: {value: false}}, 'snackbar', 'show')}>
                <Alert onClose={() => handleChange({target: {value: false}}, 'title')} severity={state.snackbar.color}>
                    {state.snackbar.msg}
                </Alert>
            </Snackbar>
        </Grid>
    );
}

const mapStateToProps = (state) => ({
    loggedIn: state.loggedIn,
    token: state.token
})


const mapDispatchToProps = (dispatch) => ({
    save: (task) => dispatch({type: 'SAVE', payload: task}),
    logout: () => dispatch({type: 'LOGOUT'})
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTodo);