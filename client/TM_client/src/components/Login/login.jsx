import React, { useState } from 'react'
import Box from '@mui/system/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const flexStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center' }


const LoginPage = () => {
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')

    return (
        <Box sx={{ ...flexStyle, width: '30%' }}>
            <h1>Welcome back 😄</h1>
            <p>Please enter email and password 💻</p>
            <form noValidate>
                <TextField
                    sx={{ marginBottom: '10px' }}
                    variant="outlined"
                    fullWidth
                    label="Email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => SetEmail(event.target.value)}
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
                type="button"
                fullWidth
                variant="contained"
                color="primary" >Sign In</Button>
        </Box>
    )
}

export default LoginPage