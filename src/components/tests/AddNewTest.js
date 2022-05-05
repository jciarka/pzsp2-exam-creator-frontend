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

export default class addNewTest extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      testName: "",
      description: ""
    };
  }

  render(){
    function handleSubmit(state) {
      console.log("SUBMIT")
      console.log(state.testName)
      console.log(state.description)
      
      const id = getSubjectId(window.location.pathname)
      
      var body = { 
        title: state.testName ,
        description: state.description ,
        subjectId: id
      }
      axios.post(commons.baseURL + "/api/tests/add", body)
        .then(response => {
          const data = response.data
          console.log("ADD NEW TEST", data)
        })
        .catch(e => { return });
    }

    // const account = useSelector(
    //   (state) => state.account
    // );
    // const mapStateToProps = state => ({
    //   account: state.account    
    // });

    function handleAddTest() {
      // const requestOptions = {
      //   method: 'GET',
      //   headers: { 
      //     'Authorization': `bearer ${account.token}`
      //   }
      // };
      // fetch(commons.baseURL + '/api/tests/search/e', requestOptions)
      //   .then(data => console.log("RESPONSE ADD TEST", data));
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
  

// var AddNewTest = () =>  {
  

  // const account = useSelector((state) => state.account);

  // function handleAddTest() {
  //   // const requestOptions = {
  //   //   method: 'GET',
  //   //   headers: { 
  //   //     'Authorization': `bearer ${account.token}`
  //   //   }
  //   // };
  //   // fetch(commons.baseURL + '/api/tests/search/e', requestOptions)
  //   //   .then(data => console.log("RESPONSE ADD TEST", data));
  //   axios.get(commons.baseURL + '/api/tests/search/e')
  //     .then(response => {
  //       const data = response.data
  //       console.log("TESTS", data)
  //     })
  //     .catch(e => { return });
  // }

//   return (
//     <Box>
//       <Button onClick={handleAddTest}>Add sample test</Button>
//     </Box>
//   )
  
// }

// export default AddNewTest