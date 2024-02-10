import React, { useState } from 'react';
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

import { CustomTextField } from '../utils';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function AddSubtaskDialog({ open, setOpen }) {

    const [editTitle, setEditTitle] = useState(false)
    const [delSubtask, setDelSubtask] = useState(false)
    const [textArray, setTextArray] = useState([
        { title: 'Subtask 1', mark_done: false },
        { title: 'Subtask 2', mark_done: false },
        { title: 'Subtask 3', mark_done: false },
        { title: 'Subtask 4', mark_done: false },
        { title: 'Subtask 5', mark_done: false },
        { title: 'Subtask 6', mark_done: false },
        { title: 'Subtask 7', mark_done: false },
        { title: 'Subtask 8', mark_done: false },
        { title: 'Subtask 9', mark_done: false },
        { title: 'Subtask 10', mark_done: false },
    ])
    const [editSubtask, setEditSubtask] = useState({})

    const handleClose = () => {
        setOpen(false);
        setEditTitle(false);
    };

    const AddSubtaskComponent = () => {
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
                        width: '90%'
                    }}>
                        <CustomTextField id="task-input"
                            label="Title"
                            variant="outlined"
                            sx={{
                                marginTop: "0.5rem",
                                marginBottom: '0.5rem',
                                width: '300px'
                            }}
                            required={true}
                            autoComplete='off'
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
                        // onClick={(event) => setSubtaskOpen(true)}
                        >
                            <AddCircleTwoToneIcon sx={{ marginBottom: "0.2rem" }} />
                            Add more Subtask
                        </Button>
                    </Box>
                    <Divider />
                    <Box
                        sx={{ width: '600px', alignSelf: 'center' }}>
                        <List
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
                                            <EditIcon
                                                sx={{
                                                    color: 'blueviolet',
                                                    width: '60px',
                                                    ':hover': { color: 'violet' },
                                                    transition: '0.2s',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => {
                                                    setEditTitle(true);
                                                    setEditSubtask({
                                                        id: textArray.indexOf(item),
                                                        title: item.title,
                                                        mark_done: item.mark_done,
                                                        del: false
                                                    });
                                                }}
                                            />
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
                                                {(editSubtask != {} && editSubtask.del && editSubtask.id == index) ? (<Box sx={{
                                                    height: '50px',
                                                    width: '258px',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                    <Typography sx={{ marginLeft: '1rem' }}>Confirm Delete ?</Typography>
                                                    <CheckCircleIcon sx={{
                                                        ':hover': { color: 'green' },
                                                        transition: '0.2s',
                                                        marginLeft: '1.2rem'
                                                    }}
                                                        onClick={() => {
                                                            const tempArray = [...textArray];
                                                            tempArray.splice(index, 1)
                                                            setTextArray(tempArray);
                                                            setEditSubtask({})
                                                        }}
                                                    />
                                                    <CancelIcon sx={{
                                                        ':hover': { color: '#7e1c1c' },
                                                        transition: '0.2s',
                                                        marginLeft: '1.2rem'
                                                    }}
                                                        onClick={() => setEditSubtask({ ...editSubtask, del: false })}
                                                    />
                                                </Box>) : (<>
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
                                                                    const tempArray = [...textArray];
                                                                    tempArray[index] = { title: item.title, mark_done: event.target.checked };
                                                                    setTextArray(tempArray);
                                                                    setEditSubtask({
                                                                        id: textArray.indexOf(item),
                                                                        title: item.title,
                                                                        mark_done: event.target.checked,
                                                                        del: false
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
                                                    <DeleteIcon
                                                        onClick={() => {
                                                            console.log('click');
                                                            setEditSubtask({
                                                                ...editSubtask,
                                                                id: index,
                                                                del: true
                                                            })
                                                        }}
                                                        sx={{
                                                            width: '60px',
                                                            color: 'red',
                                                            ':hover': { color: '#7e1c1c' },
                                                            transition: '0.2s',
                                                            cursor: 'pointer',
                                                        }} />
                                                </>)}
                                            </Box>
                                        </Box>
                                        <Divider />
                                    </div>


                                ))
                            }
                        </List>
                    </Box>
                    <Divider />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: '0.2rem',
                        marginBottom: '0.2rem'
                    }}>
                        <Button color='inherit' sx={{
                            color: "black",
                            fontSize: "16px",
                            fontWeight: "600"
                        }} onClick={handleClose}>
                            confirm
                        </Button>
                        <Button color='inherit' sx={{
                            color: "black",
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
            <>
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
                    justifyContent: 'start',
                    alignItems: 'center',
                    marginLeft: '1rem',
                    marginRight: '1rem',
                    padding: 0,
                    width: '90%'
                }}>
                    <CustomTextField id="task-input"
                        label="Title"
                        variant="outlined"
                        sx={{
                            marginTop: "0.5rem",
                            marginBottom: '0.5rem',
                            width: '300px'
                        }}
                        required={true}
                        autoComplete='off'
                        value={editSubtask.title}
                        onChange={(event) => setEditSubtask({ ...editSubtask, title: event.target.value })}
                        autoFocus
                    />
                </DialogContent>
                <Divider />
                <DialogActions sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: '0.2rem',
                    marginBottom: '0.2rem'
                }}>
                    <Button color='inherit' sx={{
                        color: "black",
                        fontSize: "16px",
                        fontWeight: "600"
                    }} onClick={() => {
                        setEditTitle(false);
                        const tempArray = [...textArray];
                        tempArray[editSubtask.id] = { title: editSubtask.title, mark_done: editSubtask.mark_done };
                        setTextArray(tempArray);
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
            </>
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