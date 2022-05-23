import { Box, Button } from '@mui/material'
import commons from '../../commons';
import React, { Component } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { withRouter } from "react-router";

class addNewTest extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      testName: "",
      description: ""
    };
  }

  handleSubmit(state) {
    const { match, history } = this.props;
    
    var body = { 
      title: state.testName ,
      description: state.description ,
      subjectId: match.params.class_id
    }

    axios.post(commons.baseURL + "/api/tests/add", body)
      .then(response => {
        history.push(`/classes/${match.params.class_id}`)
      })
      .catch(e => { return });
  }

  handleCancel() { 
    const { match, history } = this.props;
    history.push(`/classes/${match.params.class_id}`)
  }

  render(){

    function handleAddTest() {
      axios.get(commons.baseURL + '/api/tests/search/e')
        .then(response => {
          const data = response.data
          console.log("TESTS", data)
        })
        .catch(e => { return });
    }

    return (
      <Container>
        <Box display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"          
        >
        <Button onClick={handleAddTest}  sx={{marginRight : 10}}>Search</Button>
        </Box>
        <Stack spacing={3} sx={{ width: 500 }}>
          <TextField
            variant="standard"
            label="Test Name"
            placeholder="Choose Test Name"
            onChange={(event) => {
              this.setState({testName: event.target.value});
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
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => this.handleCancel()}>
            Cancel
          </Button>
          <Button variant="contained" endIcon={<SendIcon />} onClick={() => this.handleSubmit(this.state)}>
            Submit
          </Button>
        </Stack>
      </Container>
    )
  }
}


export default withRouter(addNewTest)