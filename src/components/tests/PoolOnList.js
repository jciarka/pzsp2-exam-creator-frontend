import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState, useEffect } from 'react';
import axios from "axios";
import { ListItem, ListItemText} from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';


const PoolOnList = ({pool}) => {
    const [checked, setChecked] = useState([])
    const [tasks, setTasks] = useState([])
    useEffect(() => {
      axios
          .get(`api/exercise/pool/${pool.id}`)
          .then((response) => {
              var data = response.data
              data = data.map((task) => ({...task, checked : false}))
              setTasks([...data])
              
            });        
    }, []); 

    useEffect(() => {
      let check = []
        for (let step = 0; step < tasks.length; step++) {
          check.push(false)
        }
        setChecked(check)
    }, []);

    const onClick = () => {
        console.log(pool)
        console.log('tasks', tasks)
        console.log('checked', checked)
    }
    const toggleCheckbox = (id) => {
      setTasks(tasks.map(task => task.id === id ? {...task, checked : !task.checked} : task))
    }

    const style = {
      width: '100%',
      maxWidth: 360,
      bgcolor: 'background.paper',
    };
    
  return (
    <Container>
      <ListItem button>
        <ListItemText primary={pool.name} />
      </ListItem>
      <Divider />
      {
        tasks.map((task) => 
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          <FormControlLabel
          label={task.title}
          control={<Checkbox checked={task.checked} onChange={(e) => toggleCheckbox(task.id)} />}
          />
          </ Box>
        )
      }
          
  <Button onClick={onClick}>ok</Button>

  </Container>
  );
}
  
export default PoolOnList;


  
  

  