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
                                [...Array(10).keys()].map((item, index) => (
                                    <div key={item}>
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
                                            <ListItemButton sx={{ height: '50px', width: '280px' }}>subtask{item + 1}</ListItemButton>
                                            <Divider orientation='vertical' flexItem />
                                            <EditIcon
                                                sx={{
                                                    color: 'blueviolet',
                                                    width: '60px',
                                                    ':hover': { color: 'violet' },
                                                    transition: '0.2s',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => setEditTitle(true)}
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
                        }} onClick={handleClose} autoFocus>
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
                    }} onClick={() => setEditTitle(false)}>
                        confirm
                    </Button>
                    <Button color='inherit' sx={{
                        color: "black",
                        fontSize: "16px",
                        fontWeight: "600",
                        marginRight: '0.5rem'
                    }} onClick={() => setEditTitle(false)} autoFocus>
                        Close
                    </Button>
                </Box>
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