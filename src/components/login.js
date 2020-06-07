import React from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions'
import Grid from '@material-ui/core/Grid'; 
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
    formElement: {
        margin: '15px',
        width: '301px'
        // fontSize: '70%'
    },
    logo: {
        height: '10vh',
        width: '5vw'
    },
    login: {flexFlow: 'column', justifyContent:'space-evenly', alignItems:'center'},
    appName: {backgroundColor:'#f0f4f9',color:'#43425D', padding: '5px 10px', margin:'2%', cursor: 'pointer'}
  }));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}  

function Login(props) {

    const api = axios.create({
        baseURL: 'http://localhost:8000'
    });

    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false,
        newUser: false,
    });

    const login = () => {
        api({
            url: '/login',
            method: 'GET',
            auth: {
                username: values.username,
                password: values.password
            }
        })
        .then((r) => {
            props.login({
                ...r.data,
                username: values.username
            })
            props.close();
            history.push('/');
        })
        .catch((e) => {
            if (e && e.response && e.response.status === 406) {
                setValues(v => ({...v, error: true, errMsg: 'Invalid Credentials'}))
            } else {
                setValues(v => ({...v, error: true, errMsg: 'Unknown Error Occured'}))
            }
        })
    }

    const signup = () => {
        api({
            url: '/signup',
            method: 'POST',
            data: {
                username: values.username,
                password: values.password
            }
        })
        .then((r) => {
            props.login({
                ...r.data,
                username: values.username
            })
            props.close();
            history.push('/');
        })
        .catch((e) => {
            if (e && e.response && e.response.status === 406) {
                setValues(v => ({...v, error: true, errMsg: 'User with same username already exists'}))
            } else {
                setValues(v => ({...v, error: true, errMsg: 'Unknown Error Occured'}))
            }
        })
    }

    const handleChange = (event, prop) => {
        let value = event.target.value;
        setValues(values => ({ ...values, [prop]: value}));
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Grid container style={{flexFlow: 'column', alignItems: 'center'}}>
            <Grid item>
                <h2 align="center" style={{'color':'#43425D'}}>Rohit Panjwani</h2>
            </Grid>
            <Grid item>
                <h5 style={{color:'#919191'}} align="center">Save Tasks To Be Done</h5>
            </Grid>
                {values.newUser ? <Grid item>
                    <h5 align="center" onClick={() => handleChange({target: {value: false}}, 'newUser')} className={classes.appName}>Already have a account? Click Here</h5>
                </Grid> :
                <Grid item>
                    <h5 align="center" onClick={() => handleChange({target: {value: true}}, 'newUser')} className={classes.appName}>New User? Click Here</h5>
                </Grid>}
                <fieldset>
                <legend><span>{values.newUser ? 'Sign up' : 'Log in'}</span></legend>
                <Grid item>
                    <TextField id="outlined-basic" className={classes.formElement} label="Username" variant="outlined" value={values.username} onChange={(e) => handleChange(e, 'username')}/>
                </Grid>
                <Grid item>
                <FormControl className={clsx(classes.margin, classes.formElement)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={(e) => handleChange(e, 'password')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                    labelWidth={70}
                />
                </FormControl>
                </Grid>
                </fieldset>
                <Grid item>
                <Button 
                variant="contained"
                onClick={values.newUser ? signup : login}
                color="primary"
                className={classes.formElement}>
                    {values.newUser ? 'Sign up' : 'Log in'}
                </Button>
                </Grid>
                <Snackbar open={values.error} autoHideDuration={6000} onClose={() => setValues(v => ({...v, error: false}))}>
                    <Alert onClose={() => setValues(v => ({...v, error: false}))} severity="error">
                        {values.errMsg}
                    </Alert>
                </Snackbar>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    loggedIn: state.loggedIn
})

const mapDispatchToProps = (dispatch) => ({
    login: (config) => dispatch({type:'LOGIN', payload: config}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);