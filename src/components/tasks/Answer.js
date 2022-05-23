import { Stack, Switch, TextareaAutosize } from '@mui/material'
import { Box, minWidth } from '@mui/system'
import React from 'react'

export default function Answer(props) {
    var {a, i, answers, setAnswers} = props

    var [text, setText] = React.useState("")
    var [positive, setPositive] = React.useState(false)

    function textChanged(e){
        setText(e.target.value)
        console.log("answer changed", text)
        var new_answers = window.structuredClone(answers)
        new_answers[i].text = e.target.value
        setAnswers(new_answers)
    }

    function positiveChanged(){
        setPositive(!positive)
        var new_answers = window.structuredClone(answers)
        new_answers[i].positive = !positive
        setAnswers(new_answers)
    }

    return (
        <Stack direction="row" spacing={5} style={{
            'width': '800px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box>A{i + 1}</Box>
            <TextareaAutosize
                aria-label="minimum height"
                minRows={1}
                placeholder="Write your answer here"
                fullWidth
                style={{
                marginTop:'5px',
                marginBottom:'5px',
                minWidth: '600px'
                }}
                onChange={(e) => {
                    textChanged(e)
                }}
            />
            <Switch onChange={() => positiveChanged()}/>
        </Stack>
    )
}
