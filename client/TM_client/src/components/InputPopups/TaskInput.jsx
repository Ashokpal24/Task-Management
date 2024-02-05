import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    styled,
    Alert
} from '@mui/material';
import { taskURL } from '../utils';

const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E0E3E7',
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'black',
            border: "1.5px solid"
        },
    },
});

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
                return; l
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
            <DialogTitle id="alert-dialog-title" sx={{ fontSize: "24px", fontWeight: "600" }}>
                Add Task
            </DialogTitle>
            <DialogActions sx={{
                display: "flex",
                flexDirection: "column"

            }}>
                <CustomTextField id="task-input"
                    label="Title"
                    variant="outlined"
                    sx={{
                        marginLeft: "1rem",
                        marginRight: "1rem",
                        marginBottom: "1rem"
                    }}
                    required={true}
                    autoComplete='off'
                    value={taskTitle}
                    onChange={(event) => setTaskTitle(event.target.value)}
                />
                {alertMessage != '' ? (
                    <Box sx={{ width: '100%', marginBottom: '1rem' }}>
                        <Alert severity={status}>{alertMessage}</Alert>
                    </Box>
                ) : <></>}
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