import React from 'react'
import "./Class.css"
import TaskPoolList from '../tasks/TaskPoolList'
import MembersList from '../members/MembersList'
import { Typography } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import { Chip } from '@mui/material'
import { Button } from '@mui/material'


export default function Class() {
    var task_pools = [
    {
      id: 1,
      name: "kolokwium 1"
    },
    {
      id: 2,
      name: "kolokwium 2"
    },
    {
      id: 3,
      name: "egzamin"
    },
    {
      id: 4,
      name: "egzamin poprawkowy"
    } ]

    var members = [
      {
        id: 1,
        name: "John Smith",
        role: "Owner"
      },
      {
        id: 2,
        name: "Aaron Gordon",
        role: "Assistant"
      },
      {
        id: 3,
        name: "Nate Williams",
        role: "Assistant"
      }
    ]

    return (
        <div className="class-div">
          <Stack direction="row" spacing={5} divider={<Divider orientation="vertical" flexItem />}>
            <Stack spacing={2}>
              <Typography variant="h5" component="h5">
                Task pools
              </Typography>
              <TaskPoolList pools={task_pools}></TaskPoolList>
            </Stack>
        
              {/* members */}
            <Stack spacing={2}>
              <Typography variant="h5" component="h5">
                Participants
              </Typography>
              <MembersList members={members}></MembersList>
              {/* <AddIcon></AddIcon> */}
              <Button icon={<AddIcon />}>
                <AddIcon /> Add new participant
              </Button>
            </Stack>
            
          </Stack>
            {/* task pools */}
                
        </div>
    )
}
