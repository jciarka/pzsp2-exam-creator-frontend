import React, { Component } from 'react';
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
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';


const AddNewMember = ({props}) => {
  const { class_id } = useParams()
  const [users, setUsers] = useState([])
  const [participants, setParticipants] = useState(props.location.state.participants)
  const [person, setPerson] = useState('')
  const [available, setAvailable] = useState([])
  const [role, setRole] = useState('')
  const roles = [
      'ADMIN', //3
      'WRITE', //1
      'DELETE' //2
  ]
  const [state, setState] = React.useState({
    in1: false,
    in2: false,
    in3: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const { in1, in2, in3 } = state;

  useEffect(() => {
    axios
        .get('api/auth/')
        .then((response) => {
            const data = response.data.model;
            setUsers(data)
            console.log('data', data)
            console.log('users', users)
            console.log('avaliable', available)
          });        
  }, []); 
  const availableUsers = (users, participants) => {
    var pId = new Set(participants.map(({ userId }) => userId))
    const available = users.filter((user) => !pId.has(user.id))
    return available
  }

  useEffect(() => { 
    let av =  availableUsers(users, participants)
    setAvailable(av)
 }, [participants])

 useEffect(() => {
  let av =  availableUsers(users, participants)
  setAvailable(av)
}, [users])

  const onAdd = (e) => {
    e.preventDefault()
    if(!person) {
      alert('Please add a Person')
      return
    }
    let currentRoles = [] // brak endpointu do pobierania subiects roles dict
    if(in1) {
      currentRoles.push(3)
    } if(in2) {
      currentRoles.push(1)
    }if(in3) {
      currentRoles.push(2)
    }
    var body = { 
      subjectId: class_id,
      userId: person.id,
      subjectRoles: currentRoles 
    }      
    setParticipants([...participants, person])
    axios.post(commons.baseURL + "/api/subjectuser/add", body)
          .then(response => {
            const data = response.data
            console.log("ADD PERSON TO SUBJECT", data)
          })
          .catch(e => { return });

    // if(in1){
    //   var body = { 
    //     subjectId: class_id,
    //     userId: person.id,
    //     role: roles[0]
    //   }
    //   console.log('body ', body)
    //   console.log('url ', commons.baseURL + `/api/subjectuser/${body.subjectId}/${body.userId}/roles/${body.role}`)
    //   axios.post(commons.baseURL + `/api/subjectuser/${body.subjectId}/${body.userId}/roles/${body.role}`, {})
    //       .then(response => {
    //         const data = response.data
    //         console.log("ADD ROLE", data)
    //       })
    //       .catch(e => { return });

    // }

  };

  return (
    <Container>
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        single
        id="tags-standard"
        options={available}
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
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={in1} onChange={handleChange} name="in1" />
            }
            label={roles[0]}
          />
          <FormControlLabel
            control={
              <Checkbox checked={in2} onChange={handleChange} name="in2" />
            }
            label={roles[1]}
          />
          <FormControlLabel
            control={
              <Checkbox checked={in3} onChange={handleChange} name="in3" />
            }
            label={roles[2]}
          />
        </FormGroup>
      </FormControl>
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


  
  

  