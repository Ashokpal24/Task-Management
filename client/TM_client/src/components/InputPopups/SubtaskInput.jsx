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


export default function AddSubtaskDialog({ open, setOpen }) {

    const [editTitle, setEditTitle] = useState(false)
    const [textArray, setTextArray] = useState([
        'Subtask 1',
        'Subtask 2',
        'Subtask 3',
        'Subtask 4',
        'Subtask 5',
        'Subtask 6',
        'Subtask 7',
        'Subtask 8',
        'Subtask 9',
        'Subtask 10',
    ])
    const [currSubtask, setCurrSubtask] = useState('')
    const [editSubtask, setEditSubtask] = useState('')

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
                                            <ListItemButton sx={{ height: '50px', width: '280px' }}>{item}</ListItemButton>
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
                                                    setCurrSubtask(item);
                                                    setEditSubtask(item);
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
                                                <FormControlLabel
                                                    sx={{
                                                        width: '182px',
                                                        marginLeft: '1rem'

                                                    }}
                                                    control={<Checkbox sx={{
                                                        color: 'green',
                                                        '&.Mui-checked': {
                                                            color: 'green',
                                                        },
                                                    }} />}
                                                    label="Mark Done"
                                                    labelPlacement="end"
                                                />
                                                <Divider orientation='vertical' flexItem />
                                                <DeleteIcon
                                                    sx={{
                                                        width: '60px',
                                                        color: 'red',
                                                        ':hover': { color: '#7e1c1c' },
                                                        transition: '0.2s',
                                                        cursor: 'pointer',
                                                    }} />
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
                        value={editSubtask}
                        onChange={(event) => setEditSubtask(event.target.value)}
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
                        const index = tempArray.findIndex((element, index) => element === currSubtask);
                        console.log(index);
                        tempArray[index] = editSubtask;
                        console.log(tempArray);
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