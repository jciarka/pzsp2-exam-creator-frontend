import React, { Component } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

  export default function addNewTaskPool() {
    return (
    <Container>
    <Stack spacing={3} sx={{ width: 500 }}>
      <TextField
        variant="standard"
        label="Task Pool Name"
        placeholder="Choose Task Pool Name"
      />
      <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          defaultValue=""
          placeholder="Enter Description"
        />
    </Stack>
    <Stack  direction="row" spacing={2} margin={5} justify-content="center" alignItems="center" sx={{ width: 500 }}>
      <Button variant="outlined" startIcon={<DeleteIcon />} justifyItems="center">
        Cancel
      </Button>
      <Button variant="contained" endIcon={<SendIcon />} justifyItems="center">
        Submit
      </Button>
  </Stack>
  </Container>
    )
  }
  
