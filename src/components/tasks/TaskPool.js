import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Divider } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import axios from 'axios';
import { Box } from '@mui/system';
import Exercise from './Exercise.js';
import AddNewTask from './AddNewTask.js';

function createShortText(text){
  if (!text)
  {
    return "";
  }
  const letters = 30
  var res = text.substring(0, letters);
  if (text.length > letters) {
    res += "..."
  }
  return res
}


function getPoolId(url ){
  const url_parts = url.split("/")
  for (let i = 0; i < url_parts.length; i++) {
    if (url_parts[i] == "pool" && (i + 1) != url_parts.length) {
      return parseInt(url_parts[i + 1])
    }
  }
  return -1
}


export default function TaskPool() {
  // var tasks= [
  //   {
  //     id: 1,
  //     text: "Rozwiaz rownanie x^2 = 4",
  //     isOpen: false,
  //     numberOfAnswers: 0
  //   },
  //   {
  //     id: 2,
  //     text: "Rozwiaz rownanie x^2 = 9",
  //     isOpen: false,
  //     numberOfAnswers: 0
  //   },
  //   {
  //     id: 3,
  //     text: "Rozwiaz rownanie x^2 = 1",
  //     isOpen: false,
  //     numberOfAnswers: 0
  //   },
  //   {
  //     id: 4,
  //     text: "Rozwiaz rownanie x^2 = 12",
  //     isOpen: false,
  //     numberOfAnswers: 0
  //   },
  // ]

  var [tasks, setTasks] = React.useState([]);

  
  const [fetched, setFetched] = React.useState(0);
  const [addingNewTask, setAddingNewTask] = React.useState(false);
  const [tasksAdded, setTasksAdded] = React.useState(0);
  console.log("tA", tasksAdded)
  
  const poolId = getPoolId(window.location.pathname)

  React.useEffect(() => {
    axios.get('api/exercise/pool/' + poolId)
      .then(response => {
        console.log("EXERCISES", response.data)
        setTasks(response.data)
        setFetched(fetched + 1)
      })
      .catch(e => { return });
  }, [tasksAdded])


  

  return (
    
    <Stack spacing={2}>
      {
        fetched <= 0 || tasks.length <= 0
        ?
        <Box
        sx = {{
          marginBottom: "30px",
        }}
        >No exercises found. Start by adding first exercise using button below!</Box>
        :
        tasks.map((task) => 
        <Exercise 
        task={task} 
        tasksAdded={tasksAdded}
        setTasksAdded={setTasksAdded}
        ></Exercise>
        )
      }
      {
        addingNewTask
        ?
        <AddNewTask 
        setAddingNewTask={setAddingNewTask} 
        tasksAdded={tasksAdded}
        setTasksAdded={setTasksAdded}
        ></AddNewTask>
        :
        <Button onClick={() => setAddingNewTask(!addingNewTask)}>
          <AddIcon /> Add new task
        </Button>
      }
  
    </Stack>
  );
}