import React, { useState } from 'react'
import Box from '@mui/system/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert'
import { saveJWTToken, loginURL } from '../utils.jsx';

const flexStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center' }




const LoginPage = ({ setAuthorized }) => {
    const [username, setUsername] = useState('')
    const [password, SetPassword] = useState('')
    const [status, setStatus] = useState('')
    const [alertMessage, setALertMessage] = useState('')

    const handleLogin = async () => {
        try {
            const response = await fetch(loginURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })

            })

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.hasOwnProperty('username')) {
                    setStatus('error')
                    setALertMessage('Username field should not be empty 😢')
                }
                else if (errorData.hasOwnProperty('password')) {
                    setStatus('error')
                    setALertMessage('Password field should not be empty 😢')
                } else {
                    setStatus('error')
                    setALertMessage(errorData.Error[0] + ' 😅')
                }
                return;
            }
            const data = await response.json();
            saveJWTToken({ accessToken: data.Token['access'], refreshToken: data.Token['refresh'] })
            setStatus('success')
            setALertMessage('Login Successful😄')
            setTimeout(() => setAuthorized(true), 1000)


        }
        catch (error) {
            console.error("An error occurred during login:", error);
        }
    }



    return (
        <Box sx={{ ...flexStyle, width: '400px' }}>
            <h1>Welcome back 😄</h1>
            <p>Please enter email and password 💻</p>
            <form style={{ width: "100%" }}>
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
                    label="Password"
                    autoComplete="current-password"
                    value={password}
                    type='password'
                    onChange={(event) => SetPassword(event.target.value)}
                />
            </form>

            <Button
                sx={{ marginBottom: '10px' }}
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={(e) => handleLogin()}
            >Sign In</Button>

            {alertMessage != '' ? (
                <Box sx={{ width: '100%' }}>
                    <Alert severity={status}>{alertMessage}</Alert>
                </Box>
            ) : <></>}

        </Box>
    )
}

export default LoginPage