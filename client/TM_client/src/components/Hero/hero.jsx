import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import { pink } from '@mui/material/colors';
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import CircularProgress from '@mui/material/CircularProgress';
import DnDComponent from '../DnD/list_drag_drop v2.jsx';
import Avatar from '@mui/material/Avatar';
import "../../../static/index.css";

import {
    loadJWTToken,
    deleteJWTToken,
    checkExpiration,
    profileURL,
    projectURL,
    taskURL,
    subtaskURL,
    getDataList,
    getDataItem
} from '../utils.jsx'

const HeroPage = () => {
    const [showPage, setShowPage] = useState(false)
    const [profile, setProfile] = useState([])
    const [project, setProject] = useState([])
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
        getDataList({ token: token, setList: setProfile, URL: profileURL })
        getDataItem({ token: token, setItem: setProject, URL: projectURL, Id: 1 })
    }, [])

    const formatTaskData = ({ projectObj }) => {
        var taskList = [
            [], //New
            [], //Progress
            [], //QC
            []  //Completed
        ]
        if (project[0] != undefined)
            projectObj[0]['task'].forEach((item, index) => {
                switch (item.status) {
                    case "New":
                        taskList[0].push(item)
                        break;
                    case "Progress":
                        taskList[1].push(item)
                        break;
                    case "QC":
                        taskList[2].push(item)
                        break;
                    case "Completed":
                        taskList[3].push(item)
                        break;
                    default:
                        break;
                }
            })
        return taskList

    }
    return !showPage ? (<div style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }}><CircularProgress /></div>) : (
        <Box
            className="background-gradient2"
            sx={{
                width: "100%",
                minHeight: "100vh",
                margin: "0px",
                padding: "0px"

            }}

        >
            <AppBar
                sx={{
                    boxShadow: 1,
                    position: 'static',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: "rgba(255, 255, 255, 0.845)",
                    color: "black",
                    marginBottom: "1rem"
                }} >
                <Typography

                    sx={{
                        color: "grey",
                        marginLeft: "2rem",
                        cursor: "pointer"

                    }}
                    variant='h6'
                >
                    🗒️ Task management
                </Typography>
                <LogoutRounded
                    className="pink-tone"
                    sx={{
                        borderRadius: "5px",
                        width: "50px",
                        color: "grey",
                        marginRight: "2rem",
                        fontSize: 30,
                        cursor: "pointer"

                    }}
                    onClick={() => {
                        deleteJWTToken()
                        navigateTo('/login')
                    }}
                />
            </AppBar>
            <Box
                sx={{
                    width: "95%",
                    margin: "0px",
                    padding: "0px"

                }}

            >
                <DnDComponent listData={formatTaskData({ projectObj: project })} />
            </Box>
        </Box>


    )
}

export default HeroPage