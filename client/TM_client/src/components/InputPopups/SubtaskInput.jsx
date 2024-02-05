import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Alert
} from '@mui/material';

import { CustomTextField } from '../utils';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';


export default function AddSubtaskDialog({ open, setOpen }) {

    const handleClose = () => {
        setOpen(false);
    };

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
                marginBottom: '0.2rem',
            }}>
                Add Subtask
            </DialogTitle>
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
                        marginBottom: '0.2rem',
                    }}
                    required={true}
                    autoComplete='off'
                />
                <Button
                    sx={{
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "600",
                        width: "100%",
                        textAlign: "center"
                    }}
                // onClick={(event) => setSubtaskOpen(true)}
                >
                    <AddCircleTwoToneIcon sx={{ marginBottom: "0.2rem" }} />
                    Add more Subtask
                </Button>
            </DialogContent>
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
                    }} onClick={handleClose}>
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
        </Dialog >
    );
}