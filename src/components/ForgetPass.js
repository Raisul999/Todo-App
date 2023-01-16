import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ForgetPass() {
    const navigate = useNavigate()
    const [forgetPassCred, setForgetPassCred] = useState({
        email: ""
    })
    const getdata = (e) => {
        // console.log(e.target.value);


        const { value, name } = e.target;
        // console.log(value,name);


        setForgetPassCred(() => {
            return {
                ...forgetPassCred,
                [name]: value
            }
        })

    }
    const forgetPassHandler = async (e) => {
        e.preventDefault();

        const {email} = forgetPassCred;
         if (email === "") {
            toast.error('email field is requred', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('plz enter valid email addres', {
                position: "top-center",
            });
        }
        else {


            // try {
            //     const res = await axios.post(`${process.env.REACT_APP_API_URL}api/user/register`, {
            //         name,
            //         email,
            //         password,
            //         confirmPassword
            //     })

            //     toast.success("Registration successful")

            //     setTimeout(() => {
            //         navigate('/login')
            //     }, 1000)
            //     // console.log(res);

            // } catch (err) {
                
            //     toast.error(err.response.data.message);
            // }
        }

    }
    const paperStyle = { padding: '30px 20px', width: 350, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginStyle = { marginTop: 10 }
  return (
    <Grid style={{height:'90vh'}}>
    <Paper elevation={20} style={paperStyle}>
        <Grid align='center'>
            <Avatar style={avatarStyle}>
                <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <Typography variant='caption' gutterBottom>Please add your email address to verify email </Typography>
        </Grid>
        <form>
            <TextField fullWidth label='Email' name='email' placeholder="Enter your email" onChange={getdata} style={marginStyle} />
            <Button fullWidth  type='submit' onClick={forgetPassHandler} variant='contained' color='primary' style={marginStyle}>Send</Button>
        </form>
    </Paper>
    <ToastContainer />
</Grid>
  )
}

export default ForgetPass