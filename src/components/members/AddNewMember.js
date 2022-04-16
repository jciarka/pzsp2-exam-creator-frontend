import React, { Component } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

  export default function AddNewMember() {
    return (
      <Container>
      <Stack spacing={3} sx={{ width: 500 }}>
        <Autocomplete
          single
          id="tags-standard"
          options={samplePeople}
          getOptionLabel={(option) => option.name}
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
          options={samplePeople}
          getOptionLabel={(option) => option.surname}
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
          options={samplePeople}
          getOptionLabel={(option) => option.email}
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
          options={positions}
          getOptionLabel={(option) => option.pos}
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
      <Button variant="outlined" startIcon={<DeleteIcon />} justifyItems="center">
        Delete
      </Button>
      <Button variant="contained" endIcon={<SendIcon />} justifyItems="center">
        Send
      </Button>
    </Stack>
    </Container>
  );
    
  }
  
  const samplePeople = [
    { name: 'Jan', surname:'Kowalski', email:'jankowalski@gmail.com' },
    { name: 'Maciej', surname:'Nowak', email:'mnowak@gmail.com' },
    { name: 'Wiktor', surname:'Kowalski', email:'kkowalski@gmail.com' },
    { name: 'Zygfryd', surname:'Piotrowski', email:'zzpp@gmail.com' },
    { name: 'Andrzej', surname:'Nowacki', email:'anowacki@gmail.com' },


  ];

  const positions = [
    { pos: 'Koordynator' },
    { pos: 'Prowadzący RW'},
    { pos: 'Prowadzący R'},

  ];


  
  

  