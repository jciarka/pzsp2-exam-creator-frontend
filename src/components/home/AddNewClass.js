import { Button, Stack, TextField, Typography } from '@mui/material'
import React, { Component } from 'react'

function submit() {
  console.log("ABC")
}

export default class AddNewClass extends Component {


  render() {
    return (
      <Stack 
      spacing={2}
      style={{
        width:'350px'
      }}>
        <TextField id="outlined-basic" label="Class name" variant="outlined" />
        <TextField id="outlined-basic" label="Abbreviation" variant="outlined" />
        <Typography>Import existing task pools //to do</Typography>
        <Button variant="contained" disableElevation onClick={submit()}>
          Submit
        </Button>
      </Stack>
    )
  }
}
