import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import {
    List,
    ListItem,
    ListItemButton
} from "@mui/material";
import Box from '@mui/system/Box';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CircularProgress from '@mui/material/CircularProgress';
import DnDComponent from '../DnD/list_drag_drop v2.jsx';
import AddTaskDialog from "../InputPopups/TaskInput";
import AddSubtaskDialog from '../InputPopups/SubtaskInput.jsx';
import Drawer from '@mui/material/Drawer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
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
    const [taskOpen, setTaskOpen] = useState({ status: false, type: 'add', taskId: null, title: '' });
    const [subtaskOpen, setSubtaskOpen] = useState({ status: false, task_id: null });
    const [openDrawer, setOpenDrawer] = useState(false)
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
        getProjectData({ Id: 1 })
        getProfileData()
    }, [])

    useEffect(() => { console.log(profile) }, [profile])

    const getProjectData = ({ Id }) => {
        getDataItem({ token: token, setItem: setProject, URL: projectURL, Id: Id })
    }

    const getProfileData = () => {
        getDataList({ token: token, setList: setProfile, URL: profileURL })

    }

    const getSubtaskList = ({ taskId }) => {
        if (project[0] != undefined && taskId != undefined) {
            const temp = project[0].task.filter((item, index) => item.id == taskId)
            // console.log(temp[0].subtasks)
            return temp[0].subtasks
        }
        return []
    }

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
    return !showPage ? (
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <CircularProgress />
        </div>) : (
        <Box
            className="background-gradient2"
            sx={{
                width: "100vw",
                marginRight: "calc(100vw - 100%)",
                marginLeft: 0,
                minHeight: "100vh",
                margin: "0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: 'center'
            }}
        >
            <AppBar
                sx={{
                    boxShadow: 'none',
                    position: 'static',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: "white",
                    color: "black",
                    marginBottom: "1rem",
                    borderBottom: "1.5px solid #ccc",
                    zIndex: 0
                }} >
                <Typography

                    sx={{
                        color: "black",
                        marginLeft: "2rem",
                        cursor: "pointer",
                        fontSize: "24px",
                        fontWeight: "600",
                    }}
                >
                    🗒️ Task management
                </Typography>
                <ExitToAppIcon
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
            <Typography sx={{
                width: "95%",
                heigth: "2rem",
                alignSelf: "center",
                marginBottom: "1rem",
                fontSize: "16px",
                fontWeight: "600",
                textAlign: "end",
                color: "gray"
            }} >Welcome back👋 {profile.name}</Typography>
            {(profile['name'] != undefined) ? (
                <>
                    <div
                        style={{
                            position: 'absolute',
                            top: "50%",
                            left: "0.5%",
                            height: "50%"
                        }}
                    >
                        <ArrowForwardIosIcon
                            sx={{
                                position: 'sticky',
                                top: "50%",
                                color: "grey",
                                ":hover": {
                                    color: "black",
                                    transform: "scale(2)"
                                },
                                transition: "0.2s",
                            }}
                            onClick={() => setOpenDrawer(true)}
                        />
                    </div>
                    <Drawer
                        anchor={"left"}
                        open={openDrawer}
                        onClose={() => setOpenDrawer(false)}
                    >
                        <List sx={{
                            width: 250,

                        }}>
                            <Typography variant='h6'
                                sx={{
                                    marginLeft: "1rem",
                                    userSelect: "none",
                                    marginBottom: "0.2rem"
                                }}>Projects</Typography>
                            {profile["project_list"].map((item, index) => (
                                <ListItemButton
                                    key={item.id}
                                    sx={{
                                        color: "grey",
                                        marginBottom: "0.2rem"
                                    }}
                                    onClick={() => getProjectData({ Id: item.id })}
                                >
                                    <SubdirectoryArrowRightIcon />
                                    {item.title}
                                </ListItemButton>
                            ))}
                        </List>

                    </Drawer>
                </>
            ) : (<></>)}

            <Box
                sx={{
                    width: "1200px",
                    margin: "0px",
                    padding: "0px",
                    alignSelf: "center",
                    marginLeft: "0.2rem",
                    marginRight: "0.2rem",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'start'
                }}
            >
                {project.length > 0 ? (
                    <>
                        < AddTaskDialog
                            open={taskOpen.status}
                            setOpen={setTaskOpen}
                            token={token}
                            projectId={project[0].id}
                            getProjectData={getProjectData}
                            type={taskOpen.type}
                            taskId={taskOpen.taskId}
                            title={taskOpen.title}
                        />

                        <AddSubtaskDialog
                            open={subtaskOpen.status}
                            setOpen={setSubtaskOpen}
                            token={token}
                            subtaskList={getSubtaskList({ taskId: subtaskOpen.task_id })}
                            taskId={subtaskOpen.task_id}
                            getProjectData={getProjectData}
                        />
                    </>

                ) : (<></>)}
                <DnDComponent
                    listData={formatTaskData({ projectObj: project })}
                    setTaskOpen={setTaskOpen}
                    setSubtaskOpen={setSubtaskOpen}
                    token={token}
                    getProjectData={getProjectData}
                />
            </Box>
        </Box >


    )
}

export default HeroPage