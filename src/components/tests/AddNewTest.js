import { Box, Button } from '@mui/material'
import commons from '../../commons';
import React, { Component } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';


var AddNewTest = () =>  {
  

  const account = useSelector((state) => state.account);

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
    <Box>
      <Button onClick={handleAddTest}>Add sample test</Button>
    </Box>
  )
  
}

export default AddNewTest