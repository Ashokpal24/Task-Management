import React, { useState } from 'react'
import Box from '@mui/system/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const flexStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center' }

const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (

        <Box sx={{ ...flexStyle, width: '30%' }}>
            <h1>Hi There ✋</h1>
            <p>Please Provide email, password and username 🙂</p>
            <form>
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
            </form>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary" >Sign Up</Button>
        </Box>
    )
}

export default RegisterPage;