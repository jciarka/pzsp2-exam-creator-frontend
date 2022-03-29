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

function createShortText(text){
  const letters = 30
  var res = text.substring(0, letters);
  if (text.length > letters) {
    res += "..."
  }
  return res
}


export default function Test() {
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

  var tasks = [
    {
      title:"Zadanie z geometrii",
      type:"PLAIN_TEXT",
      versions:[
        {
          text:"Oto jest pytanie",
          answers:null
        }
      ]
    }
  ]


  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    
    <Stack spacing={2}>
      <Button style={{
        marginBottom: '10px'
      }}>
        <AddIcon />Import existing test
      </Button>
      {
      tasks.map((task) => 
      <Accordion expanded={expanded === task.id} onChange={handleChange(task.id)} style={{
        'width': '800px'
      }}>
        
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          
        >
          <AssignmentIcon style={{
            'marginRight':'10px'
          }}/>
          
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {task.title}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{createShortText(task.versions[0].text)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack divider={<Divider orientation="horizontal" flexItem />}>
            
            <Typography style ={{
              'marginBottom':'10px'
            }}>
              {task.versions[0].text}
            </Typography>

            {/* ikony */}
            <Stack direction="row">
              <Tooltip title="Edit" placement="bottom">
                <IconButton>
                    <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" placement="bottom">
                <IconButton>
                    <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Stack>

          </Stack>
        </AccordionDetails>
      </Accordion>

      )}
      <Button style={{
        marginTop: '30px'
      }}>
        <AddIcon /> Add new task
      </Button>
      
    </Stack>
  );
}