import React, { Component } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { useState, useEffect } from 'react';
import { CompressOutlined } from '@mui/icons-material';


const AddNewMember = ({props}) => {
  const [users, setUsers] = useState([])
  const [participants, setParticipants] = useState(props.location.state.participants)
  const [role, setRole] = useState('WRITE')
  const roles = [
      'ADMIN',
      'WRITE',
      'DELETE'
  ]

  useEffect(() => {
    axios
        .get('api/auth/')
        .then((response) => {
            const data = response.data.model;
            setUsers(data)
            console.log('data', data)
            console.log('users', users)
        });
  }, []); 

  const availableUsers = (users, participants) => {
    var pId = new Set(participants.map(({ userId }) => userId))
    const available = users.filter((user) => !pId.has(user.id))
    return available
  }

  return (
    <Container>
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        single
        id="tags-standard"
        options={availableUsers(users, participants)}
        getOptionLabel={(option) => option.firstname}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Name"
            placeholder="Choose a Name"
          />
        )}
      />
      <Autocomplete
        single
        id="tags-standard"
        options={availableUsers(users, participants)}
        getOptionLabel={(option) => option.lastname}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Surname"
            placeholder="Choose a Surname"
          />
        )}
      />
      <Autocomplete
        single
        id="tags-outlined"
        options={availableUsers(users, participants)}
        getOptionLabel={(option) => option.emial}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="E-mail"
            placeholder="Choose an e-mail"
          />
        )}
      />
      <Autocomplete
        single
        id="tags-outlined"
        options={roles}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Position"
            placeholder="Choose a Position"
          />
        )}
      />
    </Stack>
    <Stack  direction="row" spacing={2} margin={5} justify-content="center" alignItems="center" sx={{ width: 500 }}>
    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => availableUsers(users, participants)}> 
      Cancel
    </Button>
    <Button variant="contained" endIcon={<SendIcon />}>
      Submit
    </Button>
  </Stack>
  </Container>
  );
}
  
export default AddNewMember;


  
  

  