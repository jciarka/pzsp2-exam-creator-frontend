import * as React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import { Stack } from '@mui/material';
import { Divider } from '@mui/material';


export default function AddNewTask(props) {

    var { setAddingNewTask } = props

    // var [active, setActive] = React.useState(false)
    var [type, setType] = React.useState("PLAIN_TEXT")
    var [title, setTitle] = React.useState("")
    var [type, setType] = React.useState("PLAIN_TEXT")

    var handleChangeSelect = (e) => {
        console.log("HCS")
        setType(e.target.value)
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
                    setTitle(event.target.value);
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
                    console.log("CHANGED")
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
                    CANCEL
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
                    }
                    }>
                    SUBMIT
                    </Button>
                    
                </Stack>
                </Stack>
            </Box>
        </Box>
    )
}
