import React, { useState } from 'react'
import Box from '@mui/system/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert'
import { saveJWTToken } from '../utils.jsx';


const flexStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center' }

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [status, setStatus] = useState('')
    const [alertMessage, setALertMessage] = useState('')
    const loginURL = 'https://fuzzy-rotary-phone-674p77v5gqr2xpv-8000.app.github.dev/register/'

    const handleRegister = async () => {
        try {
            const response = await fetch(loginURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    password,
                    password2
                })

            })

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.hasOwnProperty('name')) {
                    setStatus('error')
                    setALertMessage('Name field should not be empty 😢')
                }
                else if (errorData.hasOwnProperty('username')) {
                    setStatus('error')
                    setALertMessage('Username field should not be empty 😢')
                }
                else if (errorData.hasOwnProperty('email')) {
                    setStatus('error')
                    setALertMessage('Email field should not be empty 😢')
                }
                else if (errorData.hasOwnProperty('password')) {
                    setStatus('error')
                    setALertMessage('Password field should not be empty 😢')
                }
                else if (errorData.hasOwnProperty('password2')) {
                    setStatus('error')
                    setALertMessage('Password2 field should not be empty 😢')
                }
                else {
                    setStatus('error')
                    console.log(errorData.non_field_errors[0])
                    setALertMessage(errorData.non_field_errors[0] + ' 😅')
                }
                return;
            }
            const data = await response.json();
            saveJWTToken({ accessToken: data.Token['access'], refreshToken: data.Token['refresh'] })
            setStatus('success')
            setALertMessage('Register Successful😄')
        }
        catch (error) {
            console.error("An error occurred during Registeration:", error);
        }
    }

    return (

        <Box sx={{ ...flexStyle, width: '35%' }}>
            <h1 style={{ marginBottom: '2px' }}>Hi There ✋</h1>
            <p>Please Provide below credentials 🙂</p>
            <form>
                <TextField
                    sx={{ marginBottom: '10px' }}
                    variant="outlined"
                    fullWidth
                    label="Name"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <TextField
                    sx={{ marginBottom: '10px' }}
                    variant="outlined"
                    fullWidth
                    label="User Name"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />

                <TextField
                    sx={{ marginBottom: '10px' }}
                    variant="outlined"
                    fullWidth
                    label="Email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <TextField
                    sx={{ marginBottom: '10px' }}
                    variant="outlined"
                    fullWidth
                    label="Password"
                    autoComplete="current-password"
                    value={password}
                    type='password'
                    onChange={(event) => setPassword(event.target.value)}
                />

                <TextField
                    sx={{ marginBottom: '10px' }}
                    variant="outlined"
                    fullWidth
                    label="Confirm Password"
                    autoComplete="current-password"
                    value={password2}
                    type='password'
                    onChange={(event) => setPassword2(event.target.value)}
                />
            </form>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={(e) => { handleRegister() }}
            >Sign Up</Button>
            {alertMessage != '' ? (
                <Box sx={{ width: '100%' }}>
                    <Alert severity={status}>{alertMessage}</Alert>
                </Box>
            ) : <></>}
        </Box>
    )
}

export default RegisterPage;