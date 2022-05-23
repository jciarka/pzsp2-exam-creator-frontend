import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import { Link, useParams, useHistory  } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button } from '@mui/material'
import { useState, useEffect } from 'react';
import axios from "axios";
import PoolOnList from './PoolOnList';
import commons from '../../commons';


const ImportTasks = () => {
    const { class_id, test_id } = useParams()
    const history = useHistory();
    const [pools, setPools] = useState([])
    const [tasksId, setTasksId] = useState([])

    useEffect(() => {
      axios
          .get(`api/pool/pools/${class_id}`)
          .then((response) => {
              const data = response.data;
              setPools([...data])
            });        
    }, []); 

    const onClick = () => {
        console.log(pools)
        console.log('tasksId01', tasksId)
        axios.post(commons.baseURL + `/api/testexercise/add/${test_id}`, tasksId)
        .then(response => {
          history.push(`/classes/${class_id}/test/${test_id}`)
        })
        .catch(e => { return });
    }

    const refreshTasksId = (tasks) => {
      var isd = tasks.filter(task => task.checked === true).map(task => task.id)
      var out = tasks.filter(task => task.checked === false).map(task => task.id)
      isd = isd.filter(id => !tasksId.includes(id))
      out = tasksId.filter(id => !out.includes(id))
      setTasksId([...out, ...isd])
    }

  return (
    <Container>
        <Stack spacing={3} sx={{ width: 500 }}>
        {
        pools.map((pool) =>
          <PoolOnList pool={pool} refreshTasksId={refreshTasksId} />)
        }
        <Stack  direction="row" spacing={2} margin={5} justify-content="center" alignItems="center" sx={{ width: 500 }}>
            <Link to={`/classes/${class_id}/test/${test_id}`} className="rounded-0">
                <Button variant="outlined" startIcon={<DeleteIcon />} > 
                    Cancel
                </Button>
            </Link>
                <Button variant="contained" endIcon={<SendIcon />} onClick={onClick}>
                    Submit
                </Button>
        </Stack>
    </Stack>
  </Container>
  );
}
  
export default ImportTasks;


  
  

  