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
import { Link, useParams } from 'react-router-dom';
import commons from '../../commons'




const AddNewMember = ({props}) => {
  const { class_id } = useParams()
  const [users, setUsers] = useState([])
  const [participants, setParticipants] = useState(props.location.state.participants)
  const [person, setPerson] = useState('')
  const [role, setRole] = useState('')
  const [avUsers, setAvUsers] = useState([])
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

  useEffect(() => {

    console.log("Changed users: ", users)
    console.log("participants: ", participants)
 
 }, [users])

  const availableUsers = (users, participants) => {
    var pId = new Set(participants.map(({ userId }) => userId))
    const available = users.filter((user) => !pId.has(user.id))
    return available
  }
  useEffect(() => {
    console.log("role: ", role)
  }, [role])

  const onAdd = (e) => {
    e.preventDefault()
    if(!person) {
      alert('Please add a Person')
      return
    }
    else if(!role) {
      alert('Please add a role')
      return
    }
    var body = { 
      subjectId: class_id,
      userId: person.id,
      subjectRoles: []
    }
    axios.post(commons.baseURL + "/api/subjectuser/add", body)
          .then(response => {
            const data = response.data
            console.log("ADD PERSON TO SUBJECT", data)
          })
          .catch(e => { return });
    
  };

  return (
    <Container>
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        single
        id="tags-standard"
        options={availableUsers(users, participants)}
        getOptionLabel={(option) => `${option.firstname} ${option.lastname} : ${option.emial}`}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Person"
            placeholder="Choose a Person"
          />
        )}
        onChange={(event, value) => setPerson(value)}
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
        onChange={(event, value) => setRole(value)}
      />
    </Stack>
    <Stack  direction="row" spacing={2} margin={5} justify-content="center" alignItems="center" sx={{ width: 500 }}>
    <Link to={`/classes/${class_id}`} className="rounded-0">
      <Button variant="outlined" startIcon={<DeleteIcon />} > 
        Cancel
      </Button>
    </Link>
    <Button variant="contained" endIcon={<SendIcon />} onClick={onAdd}>
      Submit
    </Button>
  </Stack>
  </Container>
  );
}
  
export default AddNewMember;


  
  

  