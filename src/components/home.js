import React from 'react';
import Grid from '@material-ui/core/Grid';
import AddNewTodo from './addNewTodo';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Todo from './todo';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';


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
        },
        margin: '25px 0px'
    },
    todos: {
        display: 'grid',
        gridTemplateColumns: '23% 23% 23% 23%',
        columnGap: '2%',
        rowGap: '15px'
    }
}))

function Home(props) {
    const classes = useStyles();

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

    React.useEffect(() => {
        axios.get('http://localhost:8000/todos', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTkwODU0ODg1fQ.BvNx3lWVZwn50vj1go5Io81dGip3p-REkHyIU5zVvbc' 
            }
        }).then(res => {
            console.log(res); 
            let pinned = [], rest = [];
            for (let i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].pinned) {
                    pinned.push(res.data.data[i]);
                } else {
                    rest.push(res.data.data[i]);
                }
            }
            props.push({
                pinned,
                rest
            })
        }).catch(err => {
            console.log(err);
            if(err.response && err.response.status === 403) {
                //not logged int
                setState(state => ({
                    ...state,
                    snackbar: {
                        show: true,
                        msg: 'Login to see tasks saved on server',
                        color: 'info'
                    }
                }));
            } else {
                setState(state => ({
                    ...state,
                    snackbar: {
                        show: true,
                        msg: 'Can\'t connect to server',
                        color: 'error'
                    }
                }));
            }
        })
    }, [])

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
            <AddNewTodo />
            </Grid>
            <Grid item xs={12}><Grid container>
                    <Grid item xs={12}>
                        <Typography variant="body1" className={classes.heading}>Pinned Tasks</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {props.pinned.length ? <div className={classes.todos}>
                            {props.pinned.map((task, index) => (
                                <Todo index={index} task={task} key={task._id} pinned={true}/>
                            ))}
                        </div> : 
                        <Typography variant="body2">No tasks pinned</Typography>}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="body1" className={classes.heading}>All Tasks</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {props.rest.length ? <div className={classes.todos}>
                            {props.rest.map((task, index) => (
                                <Todo index={index} task={task} key={task._id}/>
                            ))}
                        </div> :
                        <Typography variant="body2">Tasks added will appear here</Typography>}
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={state.snackbar.show} autoHideDuration={6000} onClose={() => handleChange({target: {value: false}}, 'snackbar', 'show')}>
                <Alert onClose={() => handleChange({target: {value: false}}, 'title')} severity={state.snackbar.color}>
                    {state.snackbar.msg}
                </Alert>
            </Snackbar>
        </Grid>
    );
}

const mapStateToProps = (state) => ({
    pinned: state.pinned,
    rest: state.rest,
})

const mapDispatchToProps = (dispatch) => ({
    push: (tasks) => dispatch({type: 'PUSH', payload: tasks})
})


export default connect(mapStateToProps, mapDispatchToProps)(Home);