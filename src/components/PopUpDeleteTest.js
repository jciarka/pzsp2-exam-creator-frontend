import { Button, Dialog, DialogTitle, Stack } from '@mui/material';
import axios from 'axios';
import React, { Component } from 'react'
import commons from '../commons'

export default function PopUpDeleteTest(props) {
    var { open, id, handleClose } = props

    
    const handleYes = () => {
        console.log("handle yes", open, id)
        axios.delete(commons.baseURL + "/api/tests/delete/" + id)
        .then(() => {
            console.log("test deleted")
        });
    }

    return (
        <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth
        maxWidth="xs">
            <DialogTitle style={{
                textAlign: 'center'
            }}>Are you sure?</DialogTitle>
            <Stack direction="row" spacing={2}  sx={{
              display: 'flex',
              m: 'auto',
              width: 'fit-content',
            }}>
                <Button variant="contained" onClick={() => {
                    handleYes()
                    handleClose(true)
                }}  style={{
                    margin: '20px',
                    minWidth: '80px'
                }}>Yes</Button>

                <Button variant="contained" onClick={() => {handleClose(false)}}  style={{
                    margin: '20px',
                    minWidth: '80px'
                }}>No</Button>
            </Stack>
        </Dialog>
    );
}
