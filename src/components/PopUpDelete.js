import { Button, Dialog, DialogTitle, Stack } from '@mui/material';
import React, { Component } from 'react'
import commons from '../commons'

export default function PopUpDelete(props) {
    var { open, handleClose, id } = props

    
    function handleYes(){
        console.log("handle yes", open, handleClose, id)
        fetch(commons.baseURL + "/api/pool/delete/" + id, { method: 'DELETE' })
            .then(() => {
                console.log("task pool deleted")
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
                    handleClose(false)
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
