import { Box } from '@mui/system'
import React from 'react'

export default function Version(props) {
    var {v, i} = props

    var answers = []
    if (v && v.answers) {
        answers = v.answers
    }
    console.log("VVV", answers, v.text)


    return (
        <Box>
            <Box sx={{ 
                fontWeight: 'bold',
                marginTop: "10px",
            }}>
                Version {i + 1}:
            </Box> 
            {v.text}
            {
                answers.map((a, i) => 
                    <Box sx={{ 
                        marginTop: "10px",
                        marginLeft: "10px",
                        color: "red",
                        ...(a.positive && {
                            color: "green"
                          }),
                    }}>
                        Answer {i + 1}: {a.text}
                    </Box> 
                
                )
            }
        </Box>
    )
}
