import React, { Component } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import commons from '../../commons'
import { render } from '@testing-library/react';

  export default class addNewTaskPool extends Component {

    constructor(props) {
      super(props)
      this.state = {
        taskPoolName: "",
        description: ""
      };
    }


    render(){
      function handleSubmit(state) {
        console.log("SUBMIT")
        console.log(state.taskPoolName)
        console.log(state.description)

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: state.taskPoolName ,
            description: state.description ,
            subjectId: 1 // subjectId statyczny, do zmiany
          })
        };

        fetch(commons.baseURL + "/api/pool/add", requestOptions)
          .then(response => response)
          .then(data => {
            var status = data.status
            console.log(status)
          });
      }

      return (
        <Container>
          <Stack spacing={3} sx={{ width: 500 }}>
            <TextField
              variant="standard"
              label="Task Pool Name"
              placeholder="Choose Task Pool Name"
              onChange={(event) => {
                this.setState({taskPoolName: event.target.value});
              }}
            />
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              defaultValue=""
              placeholder="Enter Description"
              onChange={(event) => {
                this.setState({description: event.target.value});
              }}
            />
          </Stack>
          <Stack  direction="row" spacing={2} margin={5} justify-content="center" alignItems="center" sx={{ width: 500 }}>
            <Button variant="outlined" startIcon={<DeleteIcon />} justifyItems="center">
              Cancel
            </Button>
            <Button variant="contained" endIcon={<SendIcon />} justifyItems="center" onClick={() => handleSubmit(this.state)}>
              Submit
            </Button>
          </Stack>
        </Container>
      )
    }
  }
  
