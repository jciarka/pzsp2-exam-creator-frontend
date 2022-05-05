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
import axios from 'axios';

function getSubjectId(url){
  const url_parts = url.split("/")
  console.log("URL PARTS", url_parts)
  for (let i = 0; i < url_parts.length; i++) {
    if (url_parts[i] == "classes" && (i + 1) != url_parts.length) {
      return parseInt(url_parts[i + 1])
    }
  }
  return -1
}

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
        
        const id = getSubjectId(window.location.pathname)
       
        var body = { 
          name: state.taskPoolName ,
          description: state.description ,
          subjectId: id // subjectId statyczny, do zmiany
        }
        axios.post(commons.baseURL + "/api/pool/add", body)
          .then(response => {
            const data = response.data
            console.log("ADD NEW TASK POOL", data)
          })
          .catch(e => { return });
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
            <Button variant="outlined" startIcon={<DeleteIcon />}>
              Cancel
            </Button>
            <Button variant="contained" endIcon={<SendIcon />} onClick={() => handleSubmit(this.state)}>
              Submit
            </Button>
          </Stack>
        </Container>
      )
    }
  }
  
