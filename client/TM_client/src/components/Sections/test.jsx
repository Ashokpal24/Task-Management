import React from 'react'
import Box from '@mui/system/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import { deleteJWTToken } from '../utils.jsx'



const TestPage = () => {
    const navigateTo = useNavigate()
    return (
        <Box sx={{
            fontFamily: 'sans-serif',
            width: '100%',
            height: '97vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1>Welcome to Project/Task management app 🧑‍💼</h1>
            <h3>This part is still under construction 😅</h3>
            <Button
                sx={{ marginBottom: '10px' }}
                type="button"
                variant="contained"
                color='error'
                onClick={() => {
                    deleteJWTToken()
                    navigateTo('/login')
                }}
            >
                Logout
            </Button>
        </Box>
    )
}

export default TestPage