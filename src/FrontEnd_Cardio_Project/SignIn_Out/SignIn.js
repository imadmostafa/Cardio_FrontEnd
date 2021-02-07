import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import API from '../API/API';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/internet-1593358_1920.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

//snack
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { user, setUser } = useContext(UserContext);

    async function makeSignRequest() {


        const Datato_Send = {

            email: email,
            password: password

        }
        if (password == '' || email == '') {
            alert('insert a valid value');


        }//else if there is an input ->request api login
        else {

            API.SignIn(Datato_Send).then(res => {
                const result = res;
                console.log("RESULT: ", result);

                if (res.data.success == false) {
                    setErrorMessage_ToShow(res.data.message);
                    handleClick();
                } else {
                    localStorage.setItem('isloggedin', true);
                    localStorage.setItem('user_id', res.data.user.id);
                    localStorage.setItem('user_name', res.data.user.name);
                    localStorage.setItem('token', res.data.token);
                    console.log('user_name', res.data.user.name);
                    let token = localStorage.getItem('token');
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    setUser(localStorage.getItem('isloggedin'));
                    history.push('/listpatients');//to main page if logged in admin
                }
            });
        }
    }




    //snack
    const [open, setOpen] = React.useState(false);
    const [errormessage_toshow, setErrorMessage_ToShow] = useState('error signing in');
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
//end of snack functions to show error message 





    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
          </Typography>

                    <form className={classes.form} noValidate>
                        <TextField

                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={makeSignRequest}>
                            Sign In
          </Button>

                        <Grid
                            container
                            direction="column"
                            justify="space-evenly"
                            alignItems="flex-start"
                            spacing={2}
                        >
                            <Grid item>
                                <Button
                                    component={RouterLink} to={'/register'}>
                                    Register Now !
              </Button>
                            </Grid>

                        
                        </Grid>
                    </form>
                </div>
            </Grid>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {errormessage_toshow}
                </Alert>
            </Snackbar>

        </Grid>
    );
}