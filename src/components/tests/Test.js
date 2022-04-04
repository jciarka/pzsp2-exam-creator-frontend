import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Chip, FormControl, IconButton, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Divider } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { render } from '@testing-library/react';

function createShortText(text){
  const letters = 30
  var res = text.substring(0, letters);
  if (text.length > letters) {
    res += "..."
  }
  return res
}


export default class Test extends React.Component {
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

  constructor(props){
    super(props)
    this.state = {
        addingNewTask:false,
        expanded:false,
        type:''
    };
    
  }

  render(){
    
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
    
      // var [addingNewTask, setAddingNewTask] = React.useState(false);
      // const [expanded, setExpanded] = React.useState(false);
    
      // const [type, setType] = React.useState('');
    
      const handleChangeSelect = (event) => {
        this.setState({type: event.target.value});
      };
    
      const handleChange = (panel) => (event, isExpanded) => {
        this.setState({expanded: isExpanded ? panel : false});
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
        <Accordion expanded={this.state.expanded === task.id} onChange={handleChange(task.id)} style={{
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
  
        )
        }
  
        {/* new task */}
        {
          this.state.addingNewTask 
          ?
          <Box style={{
            width: '800px',
          }}>
            <Divider style={{
              marginBottom:'15px'
            }}>
            </Divider>
            <Stack>
              <Box>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Task type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.type}
                    label="Task type"
                    onChange={handleChangeSelect}
                  >
                    <MenuItem value={"PLAINTEXT"}>Plain text</MenuItem>
                    <MenuItem value={"HTML"}>Html</MenuItem>
                    <MenuItem value={"MARKDOWN"}>Markdown</MenuItem>
                    <MenuItem value={"CHOOSE_PLAINTEXT"}>Plain text with multiple answers</MenuItem>
                    <MenuItem value={"CHOOSE_MARKDOWN"}>Markdown with multiple asnwers</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                placeholder="Write content of your task here"
                fullWidth
                style={{
                  marginTop:'15px',
                  marginBottom:'15px'
                }}
              />
              {/* buttons submit and cancel */}
              <Stack direction="row" spacing={5} style={{
                'width': '800px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Button style={{
                  width: '800px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }} 
                onClick={() => {
  
                }}>
                  SUBMIT
                </Button>
                <Button style={{
                  width: '800px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onClick={() => {
                  this.setState({addingNewTask: false});
                }}>
                  CANCEL
                </Button>
              </Stack>
            </Stack>
          </Box>
          :
          null
        }
  
        <Button style={{
          marginTop: '30px'
        }} onClick={() => {
          this.setState({addingNewTask: true});
        }}>
          <AddIcon /> Add new task
        </Button>

        <Button style={{
          marginTop: '30px'
        }}>
          <AddIcon /> Submit test
        </Button>
        
      </Stack>
    );
  }
}