import React, { Component } from 'react'
import "./Class.css"
import TaskPoolList from '../tasks/TaskPoolList'
import MembersList from '../members/MembersList'
import { Typography } from '@mui/material'
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material'
import TestsList from '../tests/TestsList'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


export default class Class extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tests: [],
      testsFetched: false,
      participants: [],
      participantsFetched: false
    };

    // url statyczny, do zmiany - endpoint3
    fetch('/api/tests/1')
      .then(response => response.json())
      .then(data => {
        console.log("TESTS", data)
        this.setState({
          tests: data,
          testsFetched: true
        })
      });

    // url statyczny, do zmiany - endpoint2
    fetch('/api/participants/2')
    .then(response => response.json())
    .then(data => {
      console.log("PARTICIPANTS", data)
      this.setState({
        participants: data,
        participantsFetched: true
      })
    });
  }

  
  
  
  
  render (){
    const url = window.location.pathname
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
        } 
      ]
    
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
    
      var tests = [
        {
          id: 1,
          text: "Kolokwium nr 1, sem 22L"
        },
        {
          id: 2,
          text: "Kolokwium nr 2, sem 22L"
        },
        {
          id: 3,
          text: "Egzamin, sem 22L"
        },
      ]

      // example tests
      // [
      //   {
      //     "id": 52,
      //     "title": "Test 1",
      //     "description": "Kol. 1",
      //     "subject": {
      //       "id": 1,
      //       "name": "PZSP",
      //       "description": "12345",
      //       "subjectUsers": [],
      //       "tests": [
      //         {
      //           "id": 52,
      //           "title": "Test 1",
      //           "description": "Kol. 1",
      //           "exercises": [
      //             {
      //               "title": "Zadanie z geometrii",
      //               "type": "PLAIN_TEXT",
      //               "versions": [
      //                 {
      //                   "text": "Oto jest pytanie",
      //                   "answers": null
      //                 }
      //               ]
      //             }
      //           ]
      //         }
      //       ]
      //     },
      //     "exercises": [
      //       {
      //         "title": "Zadanie z geometrii",
      //         "type": "PLAIN_TEXT",
      //         "versions": [
      //           {
      //             "text": "Oto jest pytanie",
      //             "answers": null
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // ]
      
      return (
        <div className="class-div">
          <Stack direction="row" spacing={5} divider={<Divider orientation="vertical" flexItem />} >

            {/* task pools */}
            <Stack spacing={2} style={{
              'align-items': 'center',
            }}>
              <Typography variant="h5" component="h5">
                Task pools
              </Typography>
              <TaskPoolList pools={task_pools}></TaskPoolList>
              <Button component={Link} to={url+'/newTaskPool'}>
                <AddIcon /> Add new task pool
              </Button>
            </Stack>

            {/* tests */}
            <Stack spacing={2} style={{
              'align-items': 'center',
            }}>
              <Typography variant="h5" component="h5">
                Tests
              </Typography>
              <TestsList tests={this.state.tests}></TestsList>
              {/* <AddIcon></AddIcon> */}
              <Button component={Link} to={url+'/newTest'}>
                <AddIcon /> Add new test
              </Button>
            </Stack>

             {/* members */}
             <Stack spacing={2} style={{
              'align-items': 'center',
            }}>
              <Typography variant="h5" component="h5">
                Participants
              </Typography>
              <MembersList members={this.state.participants}></MembersList>
              {/* <AddIcon></AddIcon> */}
              <Button component={Link} to={url+'/newMember'}>
                <AddIcon /> Add new participant
              </Button>
            </Stack>
            
          </Stack>
            
                
        </div>
      )
  }
}
