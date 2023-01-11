
import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
 
    const navigate  = useNavigate()
    const [inpval, setInpval] = useState({
        name: "",
        email: "",
        confirmPassword: "",
        password: ""
    })

   

    const [data,setData] = useState([]);
    console.log(inpval);

    const getdata = (e) => {
        // console.log(e.target.value);


        const { value, name } = e.target;
        // console.log(value,name);


        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })

    }

    const addRegister = async(e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = inpval;

        if (name === "") {
            toast.error(' name field is requred!',{
                position: "top-center",
            });
        } else if (email === "") {
             toast.error('email field is requred',{
                position: "top-center",
            });
        } else if (!email.includes("@")) {
             toast.error('plz enter valid email addres',{
                position: "top-center",
            });
        } 
    
         else if (password === "") {
             toast.error('password field is requred',{
                position: "top-center",
            });
        } else if (password.length < 5) {
             toast.error('password length greater five',{
                position: "top-center",
            });
        }
            else if (password!== confirmPassword) {
                toast.error('password do not match',{
                   position: "top-center",
               });
        } 
        else {
            
            
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}api/user/register`, {
                    name,
                     email,
                    password,
                    confirmPassword
                })

                console.log(res);
                navigate ('/login')
                // if(res.data.email){
                //     signIn(
                //         {
                //             token: res.data.token,
                //             expiresIn:3600,
                //             tokenType: "Bearer",
                //             authState: res.data,
                            
                //         }
                //     )
                //     console.log('success')
                //     navigate ('/')
                //     console.log('after navigate')
                // }else {
                //     toast.error('Invalid redentials', {
                //         position: "top-center",
                //     });
                // }
            } catch (err) {
                 alert(err.message);
            }
            // console.log("data added succesfully");
            // history("/login")
            // localStorage.setItem("usertodo",JSON.stringify([...data,inpval]));

        }

    }


    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword,  setConfirmPassword] = useState("");
   
    // const RegisterHandler = async () => {

    //  const response= await axios.post('https://1534-103-62-140-118.in.ngrok.io/api/user/register',{
    //         name,
    //         email,
    //         password
    //         })
       
    //         console.log(response);
    //  };


    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginStyle = { marginTop: 10 }
   // console.log(name);
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Name' name='name' placeholder="Enter your name" onChange={getdata} />
        
                    <TextField fullWidth label='Email' name='email' placeholder="Enter your email" onChange={getdata} style={marginStyle} />

                    <TextField type='password' fullWidth label='Password' name='password' placeholder="Enter your password" onChange={getdata} style={marginStyle}/>
                    <TextField  type='password' fullWidth label='Confirm Password' name='confirmPassword' placeholder="Confirm your password" onChange={getdata} style={marginStyle}/>
                    
                    <Button type='submit' onClick={addRegister} variant='contained' color='primary' style={marginStyle}>Sign up</Button>
                </form>
            </Paper>
            <ToastContainer />
        </Grid>
        
    )
}

export default Signup;