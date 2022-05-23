import { Button, Dialog, DialogTitle, Stack } from '@mui/material';
import axios from 'axios';
import React, { Component } from 'react'

export default function PopUpDeleteTest(props) {
    var { open, id, handleClose } = props

    
    const handleYes = async () => {
        var result = await axios.delete(`/api/tests/${id}`)

        if (!result && result.status !== 200) 
         return
        
        window.location.reload(false)
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
