import React, { useEffect, useState } from 'react'
import Box from '@mui/system/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions'
import { useNavigate } from 'react-router-dom';
import {
    loadJWTToken,
    deleteJWTToken,
    checkExpiration,
    projectListURL,
    taskListURL,
} from '../utils.jsx'

const getProjectList = async ({ token, setProjectList }) => {
    try {
        const response = await fetch(projectListURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.accessToken
            },
        })
        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData)
        }
        const data = await response.json();
        setProjectList(data)
    }
    catch (error) {
        console.error("An error occurred during retriving of data:", error);
    }
}



const getTaskList = async ({ token, setTaskList }) => {
    try {
        const response = await fetch(taskListURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.accessToken
            },
        })
        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData)
        }
        const data = await response.json();
        setTaskList(data)
    }
    catch (error) {
        console.error("An error occurred during retriving of data:", error);
    }
}

const getTaskItem = async ({ token, taskId, setTaskItem }) => {
    const taskItemURL = taskListURL + taskId
    console.log(taskItemURL)
    try {
        const response = await fetch(taskItemURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.accessToken
            },
        })
        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData)
        }
        const data = await response.json();
        let new_data = []
        new_data.push(data)
        console.log(data)
        setTaskItem(new_data)
    }
    catch (error) {
        console.error("An error occurred during retriving of data:", error);
    }
}

const TestPage = () => {
    const [canRender, SetCanRender] = useState(false)
    const [projectList, SetProjectList] = useState([])
    const [taskList, SetTaskList] = useState([])
    const [taskItem, SetTaskItem] = useState([])


    const token = loadJWTToken()
    const navigateTo = useNavigate()


    useEffect(() => {
        getProjectList({ token: token, setProjectList: SetProjectList })
        getTaskList({ token: token, setTaskList: SetTaskList })

        if (token == null) {
            navigateTo('/login')
            return
        }
        if (checkExpiration(token.accessToken) == false) {
            navigateTo('/login')
            return
        }
        SetCanRender(true)
    }, [])

    return !canRender ? (<></>) : (
        <>

            <Box sx={{
                fontFamily: 'sans-serif',
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center',
                // justifyContent: 'center'
            }}>
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

                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Box sx={{
                        width: '15%',
                        height: '100%',
                        backgroundColor: '#EEEEEE',
                        boxShadow: 2

                    }}>
                        <List >
                            {taskList.map((item, index) => (
                                <ListItem disablePadding key={item.id} >
                                    <ListItemButton
                                        onClick={() => getTaskItem({ token: token, taskId: item.id, setTaskItem: SetTaskItem })
                                        }>
                                        <ListItemText>
                                            {item.title}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box sx={{
                        width: '85%',
                        height: '100%',
                        backgroundColor: '#c6c8cc',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {taskItem != [] ?
                            taskItem.map((task, index) => (
                                <Card sx={{ width: '400px' }} key={task.id}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {task.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                Rem dolorem vero commodi illo ducimus accusamus ratione nesciunt consequuntur totam itaque.
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <List >
                                            {task.subtasks.map((subtask, index) => (
                                                <ListItem disablePadding key={'subtask' + subtask.id} >
                                                    <ListItemButton>
                                                        <ListItemText>
                                                            {index + 1} {subtask.title}
                                                        </ListItemText>
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardActions>
                                </Card>
                            ))
                            : <>Nothing to view 😅</>}
                    </Box>

                </Box>
            </Box >
        </>
    )
}

export default TestPage