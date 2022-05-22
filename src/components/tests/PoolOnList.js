import * as React from 'react';
import { Container } from '@mui/material';
import { Box, Button } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState, useEffect } from 'react';
import axios from "axios";
import { ListItem, ListItemText} from '@mui/material';
import Divider from '@mui/material/Divider';


const PoolOnList = ({pool, refreshTasksId}) => {
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
       refreshTasksId(tasks)
    }, [tasks]); 

    const onClick = () => {
        console.log(pool)
        console.log('tasks', tasks)
        
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


  
  

  