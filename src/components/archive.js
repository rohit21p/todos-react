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
        rowGap: '15px',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '30% 30% 30%',
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '49% 49',
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '98%',
        }
    }
}))

function Archive(props) {
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

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}><Grid container>
                    <Grid item xs={12}>
                        <Typography variant="body1" className={classes.heading}>Archived Tasks</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {props.archived.length ? <div className={classes.todos}>
                            {props.archived.map((task, index) => (
                                <Todo index={index} task={task} key={task._id} archived={true}/>
                            ))}
                        </div> : 
                        <Typography variant="body2">No tasks archived</Typography>}
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
    archived: state.archived,
})

const mapDispatchToProps = (dispatch) => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(Archive);