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
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { Autocomplete } from '@mui/material';
import PdfLoader from '../../components/pdfs/pdfLoader'
import axios from "axios";




function createShortText(text){
  const letters = 30
  var res = text.substring(0, letters);
  if (text.length > letters) {
    res += "..."
  }
  return res
}

function getSubjectId(url){
  const url_parts = url.split("/")
  console.log("URL PARTS", url_parts)
  for (let i = 0; i < url_parts.length; i++) {
    if (url_parts[i] == "test" && (i + 1) != url_parts.length) {
      return parseInt(url_parts[i + 1])
    }
  }
  return -1
}

export default class Test extends React.Component {
  constructor(props){
    super(props)
    const test_id = getSubjectId(window.location.pathname)
    this.state = {
        addingNewTask:false,
        expanded:false,
        type:'',
        title:'',
        text:'',
        answers:null,
        exercises_id: null,
        exercises_count: 50,
        tasks: []
    };

    axios.get(`api/exercise/test/${test_id}`)
    .then(response => {
      const data = response.data
      console.log("TEST", data)
      this.setState({
        tasks: data
      })  
    })
    .catch(e => { return });
    
  }

  render(){
      const url = window.location.pathname
      const test_id = getSubjectId(window.location.pathname)
      const handleChangeSelect = (event) => {
        this.setState({type: event.target.value});
      };
    
      const handleChange = (panel) => (event, isExpanded) => {
        this.setState({expanded: isExpanded ? panel : false});
      };

      const addTask = (e) => {
        e.preventDefault()
        if(!this.state.type) {
          alert('Please add a type')
          return
        }
        else if(!this.state.title) {
            alert('Please add a title')
            return
        }
        else if(!this.state.text) {
          alert('Please add a text')
          return
        }

        var task = {
          exercises_id: this.state.exercises_count + 1,
          title:this.state.title,
          type:this.state.type,
          versions:[
            {
              text:this.state.text,
              answers:this.answers
            }
          ]
        }
        this.setState({tasks: [...this.state.tasks, task]})
        this.setState({exercises_count: this.state.exercises_count + 1})
        console.log(this.state.tasks)
      };

      const deleteTask = (id) => {
        const newTasks = this.state.tasks.filter((item) => item.id !== id)
        this.setState({tasks: [...newTasks]})          
      } 

    return (
      
      <Stack spacing={2}>
        <Link to={{
                  pathname: url+'/importTasks'
              }}
        >
          <Button style={{
            marginBottom: '10px'
          }}>
          
            <AddIcon />Import existing tasks
          </Button>
        </Link >
        {
        this.state.tasks.map((task) => 
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
                {/* <Tooltip title="Delete" placement="bottom" onClick={() => deleteTask(task.exercises_id)}> */}
                <Tooltip title="Delete" placement="bottom" onClick={() => deleteTask(task.id)}>
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
              <TextField
                variant="standard"
                label="Exercise Title"
                placeholder="Exercise Title"
                onChange={(event) => {
                  this.setState({title: event.target.value});
                }}
              />
              <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                placeholder="Write content of your task here"
                fullWidth
                style={{
                  marginTop:'15px',
                  marginBottom:'15px'
                }}
                onChange={(event) => {
                  this.setState({text: event.target.value});
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
                  this.setState({addingNewTask: false});
                }}>
                  CANCEL
                </Button>
                <Button style={{
                  width: '800px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }} 
                onClick={addTask}>
                  SUBMIT
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
        <PdfLoader testId={test_id} />
      </Stack>
    );
  }
}