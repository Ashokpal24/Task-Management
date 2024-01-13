import React, { useState } from 'react'
import Box from '@mui/system/Box'
import LoginPage from './login.jsx'
import RegisterPage from './register.jsx'

const flexStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center' }

const AuthPage = () => {
    const [isSignedUp, setSignUp] = useState(true)
    return (
        <Box sx={{ ...flexStyle, width: '100%', height: '97vh', fontFamily: 'sans-serif' }}>
            {isSignedUp ? <LoginPage /> : <RegisterPage />}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <p>{isSignedUp ? 'Not signed up yet? ' : 'Already have account?'}</p>
                <a href='#'
                    onClick={() => {
                        const signedState = isSignedUp
                        setSignUp(!signedState)
                    }}
                >click here</a>
            </Box>
        </Box>
    )
}

export default AuthPage