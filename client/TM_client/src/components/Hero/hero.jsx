import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import CircularProgress from '@mui/material/CircularProgress';

import {
    loadJWTToken,
    deleteJWTToken,
    checkExpiration,
    projectListURL,
    taskListURL,
    getDataList,
    getDataItem
} from '../utils.jsx'

const HeroPage = () => {
    const [showPage, setShowPage] = useState(false)
    const token = loadJWTToken()
    const navigateTo = useNavigate()

    useEffect(() => {
        if (token == null) {
            navigateTo('/login')
            return
        }
        if (checkExpiration(token.accessToken) == false) {
            navigateTo('/login')
            return
        }
        setShowPage(true)
    }, [])

    return !showPage ? (<div style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }}><CircularProgress /></div>) : (
        <AppBar sx={{
            boxShadow: 2,
            position: 'static',
            padding: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }} >
            <Typography variant='h6'>Task management app 🧑‍💼</Typography>
            <Button
                color='error'
                type="button"
                variant="contained"
                onClick={() => {
                    deleteJWTToken()
                    navigateTo('/login')
                }}
            >
                Logout
            </Button>
        </AppBar>
    )
}

export default HeroPage