import * as React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import { Stack } from '@mui/material';
import { Divider } from '@mui/material';
import Version from './Version'
import commons from '../../commons'
import axios from 'axios';

function getPoolId(url){
    const url_parts = url.split("/")
    for (let i = 0; i < url_parts.length; i++) {
      if (url_parts[i] == "pool" && (i + 1) != url_parts.length) {
        return parseInt(url_parts[i + 1])
      }
    }
    return -1
  }

export default function AddNewTask(props) {

    var { setAddingNewTask } = props

    var [task, setTask] =  React.useState({
        title: "",
        type: "",
        points: 1,
        poolId: getPoolId(window.location.pathname),
        versions: []
    })

    var [version, setVersion] = React.useState({
        text: "",
        answers: []
    })



    // console.log("REFRESH", task)
    // var [active, setActive] = React.useState(false)
    var [type, setType] = React.useState("PLAIN_TEXT")
    var [text, setText] = React.useState("")
    var [title, setTitle] = React.useState("")
    var [verAdded, setVerAdded] = React.useState(0)

    var handleChangeSelect = (e) => {
        console.log("HCS")
        setType(e.target.value)
        var new_task = task
        task.type = e.target.value
        setTask(new_task)
    }

    function submitTask(){
        console.log("TASK", task)
        postTask()
    }

    function postTask() {
        axios.post(commons.baseURL + "/api/exercise/add", task)
          .then(response => {
            const data = response.data
            console.log("ADDED NEW TASK", data)
          })
          .catch(e => { return });
    }

    function addVersion(e) {
        console.log("ADD VERSION")

        var new_version = version
        new_version.text = text
        setVersion(new_version)

        task.versions.push(Object.assign({}, new_version))
        console.log(title, task)
        setVerAdded(verAdded + 1)
    }

    function textChanged(e) {
        setText(e.target.value)
    }

    function titleChanged(e) {
        setTitle(e.target.value);
        var new_task = task
        task.title = e.target.value
        setTask(new_task)
        // task.assign(title, ...title)
        console.log(title, task)
    }


    return (
        <Box>
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
                        value={type}
                        label="Task type"
                        onChange={(e) => handleChangeSelect(e)}
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
                    onChange={(e) => {
                        titleChanged(e)
                    }}
                />

                {/* current content of a task */}
                {
                    verAdded > 0
                    ?
                    <Box>
                        <Box sx={{ fontWeight: 'bold'}}>Title:</Box> {task.title}
                        {
                            task.versions.map((v, i) => 
                                <Version v={v} i={i}></Version>
                            )
                        }

                    </Box>
                    :
                    null
                }

                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={5}
                    placeholder="Write content of your task here"
                    fullWidth
                    style={{
                    marginTop:'15px',
                    marginBottom:'15px'
                    }}
                    onChange={(e) => {
                        textChanged(e)
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
                        setAddingNewTask(false);
                    }}>
                    CANCEL TASK
                    </Button>

                    <Button style={{
                    width: '800px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}
                    onClick={() => {
                        addVersion()
                    }}>
                    ADD VERSION
                    </Button>

                    <Button style={{
                    width: '800px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                    }} 
                    onClick={() => {
                        console.log("CLICK");
                        setAddingNewTask(false);
                        submitTask();
                    }
                    }>
                    SUBMIT TASK
                    </Button>
                    
                </Stack>
                </Stack>
            </Box>
        </Box>
    )
}
