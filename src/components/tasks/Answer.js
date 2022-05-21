import { Stack, Switch, TextareaAutosize } from '@mui/material'
import { Box, minWidth } from '@mui/system'
import React from 'react'

export default function Answer(props) {
    var {a, i} = props

    function textChanged(){
        console.log("answer changed")
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
            <Switch />
        </Stack>
    )
}
