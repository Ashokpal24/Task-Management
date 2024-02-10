import React, { useState } from 'react';
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



export default function AddTaskDialog({ open, setOpen, token, projectId, getProjectData }) {
    const [taskTitle, setTaskTitle] = useState('')
    const [status, setStatus] = useState('')
    const [alertMessage, setALertMessage] = useState('')

    const handleClose = () => {
        setStatus('')
        setALertMessage('')
        setOpen(false);
    };
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
            console.log(data);
            setStatus('success')
            setALertMessage('Task added Successful😄')
            setTimeout(() => setOpen(false), 1000)
            getProjectData()
        }
        catch (error) {
            console.error("An error occurred during login:", error);
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
                Add Task
            </DialogTitle>
            <Divider />
            <DialogContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'center',
                marginLeft: '1rem',
                marginRight: '1rem',
                padding: 0

            }}>
                <CustomTextField id="task-input"
                    label="Title"
                    variant="outlined"
                    sx={{
                        marginTop: "0.5rem",
                        marginBottom: '0.5rem',
                    }}
                    required={true}
                    autoComplete='off'
                    value={taskTitle}
                    onChange={(event) => setTaskTitle(event.target.value)}
                />
                {alertMessage != '' ? (
                    <Box sx={{ width: '100%' }}>
                        <Alert severity={status}>{alertMessage}</Alert>
                    </Box>
                ) : <></>}
            </DialogContent>
            <Divider />
            <DialogActions sx={{
                display: "flex",
                flexDirection: "column"
            }}>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                    <Button color='inherit' sx={{
                        color: "black",
                        fontSize: "16px",
                        fontWeight: "600"
                    }} onClick={handleAddTask}>
                        Add
                    </Button>
                    <Button color='inherit' sx={{
                        color: "black",
                        fontSize: "16px",
                        fontWeight: "600",
                        marginRight: '0.5rem'
                    }} onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}