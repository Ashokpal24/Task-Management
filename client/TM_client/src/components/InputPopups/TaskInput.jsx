import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Alert,
    Divider
} from '@mui/material';
import { taskURL, CustomTextField } from '../utils';



export default function AddTaskDialog({ open, setOpen, token, projectId, getProjectData, type, taskId, title }) {
    const [taskTitle, setTaskTitle] = useState('')
    const [status, setStatus] = useState('info')
    const [alertMessage, setALertMessage] = useState('Add the title of task 🖊️.')
    const [cardType, setCardType] = useState('add')


    const handleClose = () => {
        setOpen({ status: false, type: type, taskId: null, title: '' });
    };

    useEffect(() => {
        setCardType(type)
        setTaskTitle(title)
        if (type == 'edit')
            setALertMessage('Edit the title of task 🖊️.')
    }, [type]);


    const handleAddTask = async () => {

        try {
            const response = await fetch(taskURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.accessToken
                },
                body: JSON.stringify({ title: taskTitle, project_id: projectId })

            })

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.hasOwnProperty('title')) {
                    setStatus('error')
                    setALertMessage('Title field should not be empty 😢')
                }
                console.log(errorData)
                return;
            }
            const data = await response.json();
            // console.log(data);
            setStatus('success')
            setALertMessage('Task added Successful😄')
            setTimeout(() => handleClose(), 1000)
            getProjectData({ Id: projectId })
        }
        catch (error) {
            console.error("An error occurred during login:", error);
        }
    }

    const handleUpdateSubtask = async ({ updatedData, taskId }) => {

        try {
            const response = await fetch(taskURL + taskId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.accessToken
                },
                body: JSON.stringify({ ...updatedData })

            })

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.hasOwnProperty('title')) {
                    setStatus('error')
                    setALertMessage('Title field should not be empty 😢')
                }
                console.log(errorData)
                return;
            }
            const data = await response.json();
            // console.log(data)
            setStatus('success')
            setALertMessage('Task updated Successful😄')
            setTimeout(() => handleClose(), 1000)
            getProjectData({ Id: projectId })

        }
        catch (error) {
            console.error("An error occurred during update:", error);
        }
    }

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            sx={{}}
        >
            <DialogTitle id="alert-dialog-title" sx={{
                fontSize: "24px",
                fontWeight: "600",
                paddingBottom: 0,
                marginBottom: '1rem',
            }}>
                {cardType == 'add' ? "Add Task" : "Edit Task"}
            </DialogTitle>
            <Divider />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'center',
                marginLeft: '1rem',
                marginRight: '1rem',
                width: '568px',
                padding: 0

            }}>
                <CustomTextField id="task-input"
                    label="Title"
                    variant="outlined"
                    sx={{
                        width: '100%',
                        marginTop: "0.5rem",
                        marginBottom: '0.5rem',
                    }}
                    required={true}
                    autoComplete='off'
                    value={taskTitle}
                    onChange={(event) => setTaskTitle(event.target.value)}
                    autoFocus
                />

            </Box>
            <Box sx={{ width: '100%', marginBottom: '0.5rem' }}>
                <Alert severity={status}>{alertMessage}</Alert>
            </Box>
            <Divider />
            <DialogActions sx={{
                display: "flex",
                flexDirection: "column",

            }}>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                }}>
                    <Button color='inherit' sx={{
                        color: "black",
                        fontSize: "16px",
                        fontWeight: "600"
                    }} onClick={() => {
                        if (cardType == 'add') {
                            handleAddTask()
                        }
                        else {
                            handleUpdateSubtask({
                                updatedData: { title: taskTitle, },
                                taskId: taskId,
                            })
                        }
                    }}>
                        {cardType == 'add' ? "Add" : "Confirm"}
                    </Button>
                    <Button color='inherit' sx={{
                        color: "black",
                        fontSize: "16px",
                        fontWeight: "600",
                        // marginRight: '0.5rem'
                    }} onClick={handleClose} >
                        Close
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}