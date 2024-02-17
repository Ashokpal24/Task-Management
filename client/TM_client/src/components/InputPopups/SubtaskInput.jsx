import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Alert,
    Divider,
    Typography,
    FormControlLabel,
    Checkbox,
    TextField
} from '@mui/material';

import { CustomTextField, subtaskURL } from '../utils';
import IconButton from '@mui/material/IconButton';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// Dummy textArray
// { title: 'Subtask 1', mark_done: false },
// { title: 'Subtask 2', mark_done: false },
// { title: 'Subtask 3', mark_done: false },
// { title: 'Subtask 4', mark_done: false },
// { title: 'Subtask 5', mark_done: false },
// { title: 'Subtask 6', mark_done: false },
// { title: 'Subtask 7', mark_done: false },
// { title: 'Subtask 8', mark_done: false },
// { title: 'Subtask 9', mark_done: false },
// { title: 'Subtask 10', mark_done: false },

export default function AddSubtaskDialog({ open, setOpen, subtaskList, token, projectId, taskId, getProjectData }) {

    const [editTitle, setEditTitle] = useState(false)
    const [textArray, setTextArray] = useState([])
    const [editSubtask, setEditSubtask] = useState({})
    const [status, setStatus] = useState('info')
    const [alertMessage, setALertMessage] = useState('Add or Edit subtask 🗒️.')
    const scrollValue = useRef(0)
    const scrollRef = useRef(null)

    useEffect(() => {
        // console.log(subtaskList)
        if (subtaskList != undefined && open == true) {
            setTextArray(subtaskList)
        }
        else if (subtaskList == undefined && open == true) {
            setTextArray([]);
        }
        else {
            setEditSubtask({})
        }
    }, [subtaskList])

    const handleClose = () => {
        setEditTitle(false);
        scrollValue.current = 0
        scrollRef.current = null
        setOpen({ status: false, task_id: null });
        getProjectData({ Id: projectId })

    };


    const handleAddSubtask = async ({ sTitle }) => {

        try {
            const response = await fetch(subtaskURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.accessToken
                },
                body: JSON.stringify({ title: sTitle, task: taskId })

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
            const tempArray = [...textArray];
            tempArray.push(data)
            setTextArray(tempArray);
            setStatus('success')
            setALertMessage('Subtask added Successful😄')
        }
        catch (error) {
            console.error("An error occurred during adding subtask:", error);
        }
    }


    const handleUpdateSubtask = async ({ updatedData, subtaskId, index }) => {

        try {
            const response = await fetch(subtaskURL + subtaskId, {
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
            const tempArray = [...textArray];
            tempArray[index] = data;
            // console.log(tempArray)
            setTextArray(tempArray);
            setEditSubtask({
                id: data.id,
                index: index,
                title: data.title,
                mark_done: data.mark_done,
                del: false
            })
            setEditTitle(false)
            setStatus('success')
            setALertMessage('subtask updated Successful😄')
            // setTimeout(() => setOpen(false), 1000)
        }
        catch (error) {
            console.error("An error occurred during update:", error);
        }
    }

    const handleDelSubtask = async ({ subtaskId, index }) => {

        try {
            const response = await fetch(subtaskURL + subtaskId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.accessToken
                },
            })

            if (!response.ok) {
                const errorData = await response.json();
                // if (errorData.hasOwnProperty('title')) {
                //     setStatus('error')
                //     setALertMessage('Title field should not be empty 😢')
                // }
                console.log(errorData)
                return;
            }
            const data = await response.json();
            // console.log(data);
            const tempArray = [...textArray];
            tempArray.splice(index, 1)
            setTextArray(tempArray);
            setEditSubtask({})
            // setStatus('success')
            // setALertMessage('Task added Successful😄')
            // setTimeout(() => setOpen(false), 1000)
        }
        catch (error) {
            console.error("An error occurred during deleting:", error);
        }
    }
    const AddSubtaskComponent = () => {
        const [subtaskTitle, SetSubtaskTitle] = useState('')

        useEffect(() => {
            // console.log(scrollValue.current);
            scrollRef.current.scrollTop = scrollValue.current
        }, [])

        return (
            <>
                <DialogTitle id="alert-dialog-title" sx={{
                    fontSize: "24px",
                    fontWeight: "600",
                    paddingBottom: 0,
                    marginBottom: '0.2rem',
                }}>
                    Add Subtask
                </DialogTitle>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyItems: 'start'
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'center',
                        marginLeft: '1rem',
                        marginRight: '1rem',
                        width: '584px'
                    }}>
                        <CustomTextField id="task-input"
                            label="Title"
                            variant="outlined"
                            sx={{
                                width: '300px',
                                marginTop: "0.5rem",
                                marginBottom: '0.5rem'
                            }}
                            required={true}
                            autoComplete='off'
                            value={subtaskTitle}
                            onChange={(event) => {
                                const temp = event.target.value;
                                SetSubtaskTitle(temp);
                                // console.log(subtaskTitle);
                            }}
                            autoFocus
                        />
                        <Button
                            color='inherit'
                            sx={{
                                marginLeft: '1rem',
                                color: "black",
                                fontSize: "12px",
                                fontWeight: "600",
                                textAlign: "center",
                                width: "200px",
                                height: '55px'
                            }}
                            onClick={(event) => {
                                handleAddSubtask({ sTitle: subtaskTitle })
                            }}
                        >
                            <AddCircleTwoToneIcon sx={{ marginBottom: "0.2rem" }} />
                            Add more Subtask
                        </Button>
                    </Box>
                    {alertMessage != '' ? (
                        <>
                            <Divider />
                            <Box sx={{ width: '100%', marginBottom: '0.5rem', }}>
                                <Alert severity={status}>{alertMessage}</Alert>
                            </Box>
                        </>
                    ) : <></>}
                    <Divider />
                    <div
                        sx={{ width: '600px', alignSelf: 'center' }}>
                        <List
                            ref={scrollRef}
                            onScroll={(event) => scrollValue.current = event.target.scrollTop}
                            sx={{
                                overflowY: 'scroll',
                                maxHeight: '200px',
                                margin: 0,
                                padding: 0
                            }}
                        >
                            {
                                textArray.map((item, index) => (
                                    <div key={index}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {/* {editTitle
                                            ? (<Box sx={{ height: '50px', width: '340px' }} />)
                                            : (<> */}
                                            <ListItemButton sx={{ height: '50px', width: '280px' }}>{item.title}</ListItemButton>
                                            <Divider orientation='vertical' flexItem />
                                            <IconButton
                                                sx={{
                                                    color: 'cornflowerblue',
                                                    marginLeft: "0.2rem",
                                                    marginRight: "0.2rem",
                                                    ':hover': { color: 'blueviolet' },
                                                    transition: '0.2s',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => {
                                                    setStatus('info')
                                                    setALertMessage('Edit the title of subtask 🖊️.')
                                                    setEditTitle(true);
                                                    setEditSubtask({
                                                        id: item.id,
                                                        index: index,
                                                        title: item.title,
                                                        mark_done: item.mark_done,
                                                        del: false
                                                    });
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>

                                            {/* </>)} */}
                                            <Divider orientation='vertical' flexItem />
                                            <Box sx={{
                                                height: '50px',
                                                width: '242px',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'start',
                                                alignItems: 'center',
                                            }}>
                                                {(editSubtask != {} && editSubtask.del && editSubtask.index == index) ? (
                                                    <Box sx={{
                                                        height: '50px',
                                                        width: '258px',
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}>
                                                        <Typography sx={{ marginLeft: '1rem' }}>Confirm Delete?</Typography>

                                                        <IconButton sx={{
                                                            ':hover': { color: 'green' },
                                                            transition: '0.2s',
                                                            marginLeft: '1rem'
                                                        }}
                                                            onClick={() => {
                                                                handleDelSubtask({ subtaskId: item.id, index: index })
                                                            }}
                                                        >
                                                            <CheckCircleIcon />
                                                        </IconButton>

                                                        <IconButton sx={{
                                                            ':hover': { color: '#7e1c1c' },
                                                            transition: '0.2s',
                                                            marginRight: '0.6rem'
                                                        }}
                                                            onClick={() => setEditSubtask({ ...editSubtask, del: false })}
                                                        >
                                                            <CancelIcon />
                                                        </IconButton>
                                                    </Box>)
                                                    :
                                                    (<>
                                                        <FormControlLabel
                                                            id={index}
                                                            sx={{
                                                                width: '182px',
                                                                marginLeft: '1rem'

                                                            }}
                                                            control={
                                                                <Checkbox
                                                                    checked={item.mark_done}
                                                                    onChange={(event) => {
                                                                        handleUpdateSubtask({
                                                                            updatedData: { mark_done: event.target.checked },
                                                                            subtaskId: item.id,
                                                                            index: index
                                                                        })
                                                                    }}
                                                                    sx={{
                                                                        color: 'green',
                                                                        '&.Mui-checked': {
                                                                            color: 'green',
                                                                        },
                                                                    }} />
                                                            }

                                                            label="Mark Done"
                                                            labelPlacement="end"
                                                        />
                                                        <Divider orientation='vertical' flexItem />

                                                        <IconButton
                                                            onClick={() => {
                                                                // console.log('click');
                                                                setEditSubtask({
                                                                    id: item.id,
                                                                    index: index,
                                                                    title: item.title,
                                                                    mark_done: item.mark_done,
                                                                    del: true
                                                                })
                                                            }}
                                                            sx={{
                                                                marginLeft: "0.2rem",
                                                                marginRight: "0.2rem",
                                                                color: 'red',
                                                                ':hover': { color: '#7e1c1c' },
                                                                transition: '0.2s',
                                                                cursor: 'pointer',
                                                            }} >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </>)}
                                            </Box>
                                        </Box>
                                        <Divider />
                                    </div>


                                ))
                            }
                        </List>
                    </div>
                    <Divider />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'end',
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: '0.2rem',
                        marginBottom: '0.2rem'
                    }}>
                        <Button color='inherit' sx={{
                            color: "black",
                            alignSelf: "end",
                            fontSize: "16px",
                            fontWeight: "600",
                            marginRight: '0.5rem'
                        }} onClick={handleClose}>
                            Close
                        </Button>
                    </Box>
                </Box >
            </>
        )

    }

    const EditSubtaskComponent = () => {
        return (
            <Box sx={{ width: '600px' }}>
                <DialogTitle id="alert-dialog-title" sx={{
                    fontSize: "24px",
                    fontWeight: "600",
                    paddingBottom: 0,
                    marginBottom: '0.2rem',
                }}>
                    Edit Subtask
                </DialogTitle>
                <Divider />
                <DialogContent sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: '1rem',
                    marginRight: '1rem',
                    padding: 0,
                }}>
                    <CustomTextField id="task-input"
                        label="Title"
                        variant="outlined"
                        sx={{
                            marginTop: "0.5rem",
                            marginBottom: '0.5rem',
                            width: '100%'
                        }}
                        required={true}
                        autoComplete='off'
                        value={editSubtask.title}
                        onChange={(event) => setEditSubtask({ ...editSubtask, title: event.target.value })}
                        autoFocus
                    />
                </DialogContent>
                <Box sx={{ width: '100%', marginBottom: '0.5rem', }}>
                    <Alert severity={status}>{alertMessage}</Alert>
                </Box>
                <Divider />
                <DialogActions sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    width: 'auto',
                    marginTop: '0.2rem',
                    marginBottom: '0.2rem'
                }}>
                    <Button color='inherit' sx={{
                        color: "black",
                        fontSize: "16px",
                        fontWeight: "600"
                    }} onClick={() => {
                        handleUpdateSubtask({
                            updatedData: { title: editSubtask.title, },
                            subtaskId: editSubtask.id,
                            index: editSubtask.index
                        })
                    }}>
                        confirm
                    </Button>
                    <Button color='inherit' sx={{
                        color: "black",
                        fontSize: "16px",
                        fontWeight: "600",
                        marginRight: '0.5rem'
                    }} onClick={() => setEditTitle(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Box>
        )
    }
    return (

        <Dialog
            open={open}
            onClose={handleClose}
        >
            {editTitle ? <EditSubtaskComponent /> : <AddSubtaskComponent />}
        </Dialog >
    );
}