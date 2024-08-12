import React, { useState } from 'react'
import { Box, Typography, useMediaQuery, TextField, Button, Alert, Collapse } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()

    // media
    const isNotMobile = useMediaQuery("(min-width:1000px)")

    // states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    // login ctrl
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/v1/auth/login', { email, password })
            toast.success("Login successful!")
            localStorage.setItem("authToken", true)
            navigate('/menu')
        } catch (err) {
            console.log(err)
            if (err.response.data.error) {
                setError(err.response.data.error)
            } else if (err.message) {
                setError(err.message)
            }
            setTimeout(() => { setError("") }, 5000)
        }
    }

    return (
        <Box
            className='box1'
            style={{ marginTop: "30px" }}
            width={isNotMobile ? '40%' : '80%'}
            p={'40px'} m={'10rem auto'}
            borderRadius={5}
            sx={{ boxShadow: 5, backgroundColor: "rgb(47, 53, 67)" }}>
            <Collapse in={!!error}>
                <Alert severity='error' sx={{ mb: 2 }}>Invalid credentials</Alert>
            </Collapse>
            <form onSubmit={handleSubmit} method='POST'>
                <Typography variant='h4' sx={{ color: "white" }}>Sign In</Typography>
                <TextField
                    label="email" required
                    type='email'
                    margin='normal'
                    fullWidth value={email}
                    sx={{
                        '& .MuiInputBase-root': {
                            color: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                            '&.Mui-focused': {
                                color: 'white',
                            },
                        },
                    }}
                    onChange={(e) => { setEmail(e.target.value) }}>
                </TextField>
                <TextField
                    label="password" required
                    type='password'
                    margin='normal'
                    fullWidth value={password}
                    sx={{
                        '& .MuiInputBase-root': {
                            color: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                            '&.Mui-focused': {
                                color: 'white',
                            },
                        },
                    }}
                    onChange={(e) => { setPassword(e.target.value) }}>
                </TextField>
                <Button
                    color='success'
                    type='submit'
                    fullWidth variant='contained'
                    size='large'
                    sx={{
                        color: 'white',
                        mt: 2,
                        '&:hover': {
                            backgroundColor: "#ffffff",
                            color: "rgb(0, 0, 0)",
                            boxShadow: " 0 0 25px rgb(4, 255, 0), 0 0 100px rgb(4, 255, 0)",
                        },
                    }}>
                    Sign Up
                </Button>
                <Typography color="white" mt={2}>Don't have an account?
                    <Link to="/register" style={{ textDecoration: "none" }}>
                        <b style={{ color: "white", borderBottom: "2px solid white", marginLeft: "4px" }}>
                            Please Register</b>
                    </Link>
                </Typography>
            </form>
        </Box >
    )
}

export default Login
