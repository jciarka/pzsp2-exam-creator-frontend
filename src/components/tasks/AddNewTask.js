import * as React from 'react';
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, TextareaAutosize, TextField } from '@mui/material';
import { Stack } from '@mui/material';
import { Divider } from '@mui/material';
import Version from './Version'
import commons from '../../commons'
import axios from 'axios';
import Answer from "./Answer"

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

    var { setAddingNewTask, tasksAdded, setTasksAdded } = props

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
    var [type, setType] = React.useState("PLAINTEXT")
    var [text, setText] = React.useState("")
    var [title, setTitle] = React.useState("")
    var [verAdded, setVerAdded] = React.useState(0)
    var [answers, setAnswers] = React.useState([])
    var [ansAdded, setAnsAdded] = React.useState(0)
    var [alertOpen, setAlertOpen] = React.useState(false)

    function handleAlertClose(){
        setAlertOpen(false)
    }

    var handleChangeSelect = (e) => {
        console.log("HCS")
        setType(e.target.value)
        if (e.target.value != "CHOOSE_PLAINTEXT" && e.target.value != "CHOOSE_MARKDOWN"){
            setAnsAdded(0)
        }
        var new_task = task
        task.type = e.target.value
        setTask(new_task)
    }

    function submitTask(){
        console.log("TASK", task)
        console.log("ANSWERS", answers)
        if (task.versions.length > 0 && task.title.length > 0){
            setAddingNewTask(false);
            postTask()
        } else {
            setAlertOpen(true)
        }
    }

    function postTask() {
        axios.post(commons.baseURL + "/api/exercise/add", task)
          .then(response => {
            const data = response.data
            console.log("ADDED NEW TASK", data)
            setTasksAdded(tasksAdded + 1)
          })
          .catch(e => { return });
    }

    function answersNotEmpty(){
        for (var a of answers){
            console.log("A", a, answers)
            if (a.text.length <= 0){
                return false
            }
        }
        return true
    }

    function addVersion(e) {
        console.log("ADD VERSION")
        console.log(version)

        if (text.length > 0 && answersNotEmpty()){
            var new_version = version
            new_version.text = text
            new_version.answers = answers
            setVersion(new_version)
    
            task.versions.push(Object.assign({}, new_version))
            console.log(title, task)
            setVerAdded(verAdded + 1)

        } else {
            console.log("VERSION NOT ADDED")
            setAlertOpen(true)
        }
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

    function addAnswer() {
        console.log("ADD ANSWER", answers)
        var answers2 = answers
        answers2.push(
            {
                text: "",
                positive: false
            }
        )
        setAnswers(answers2)
        console.log("ADD ANSWER 2", answers)

        setAnsAdded(ansAdded + 1)
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
                        <MenuItem value={"CHOOSE_MARKDOWN"}>Markdown with multiple answers</MenuItem>
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

                {/* answers */}
                {
                    ansAdded > 0
                    ?
                    <Box>
                        <Box sx={{ fontWeight: 'bold'}}>Answers:</Box>
                        {
                            answers.map((a, i) => 
                            <Answer a={a} i={i} answers={answers} setAnswers={setAnswers}></Answer>
                            )
                        }
                    </Box>
                    :
                    null
                }

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

                    {
                        type === "CHOOSE_PLAINTEXT" || type === "CHOOSE_MARKDOWN"
                        ?
                        <Button style={{
                        width: '800px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                        }}
                        onClick={() => {
                            addAnswer()
                        }}>
                        ADD ANSWER
                        </Button>
                        :
                        null
                    }

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
                        
                        submitTask();
                    }
                    }>
                    SUBMIT TASK
                    </Button>
                    
                </Stack>
                </Stack>
            </Box>

            {/* alert */}
            <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
           
                <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                Adding task or version unsuccessful 
                </Alert>
            
            </Snackbar>
        </Box>
    )
}
