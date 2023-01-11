import { useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSignIn } from 'react-auth-kit';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Login = () => {

    const navigate = useNavigate()
    const signIn = useSignIn()

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    console.log(credentials);

    const handleCredentials = (e) => {

        const { value, name } = e.target;

        setCredentials(() => {
            return {
                ...credentials,
                [name]: value
            }
        })

    }

    const login = async (e) => {
        e.preventDefault();

        const { email, password } = credentials;
        if (email === "") {
            toast.error('email field is requred', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('plz enter valid email addres', {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error('password field is requred', {
                position: "top-center",
            });
        } else if (password.length < 5) {
            toast.error('password length greater five', {
                position: "top-center",
            });
        } else {

            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}api/user/login`, {
                    email,
                    password
                })

                console.log(res);
                if (res.data.email) {
                    signIn(
                        {
                            token: res.data.token,
                            expiresIn: 3600,
                            tokenType: "Bearer",
                            authState: res.data,

                        }
                    )

                    navigate('/')
                    
                } else {
                    toast.error('Invalid redentials', {
                        position: "top-center",
                    });
                }
            } catch (err) {
                alert(err.message);
            }



        }

    }


    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const marginStyle = { marginTop: 10 }
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
            
                <TextField
                    label='Username'
                    placeholder='Enter username'
                    fullWidth
                    name='email'
                    onChange={handleCredentials}
                    style={marginStyle} />
               

                <FormControl sx={{ mt:2 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        name='password'
                        onChange={handleCredentials}
                    />
                </FormControl>
                <Button type='submit' onClick={login} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                    <Link href="#" >
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography > Don't have an account ?
                    <Link href="/Signup" >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
            <ToastContainer />
        </Grid>
    )
}

export default Login