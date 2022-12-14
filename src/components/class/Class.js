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
import commons from '../../commons'
import axios from "axios";
import { getPrivileges } from '../../commons'

function getSubjectId(url){
  const url_parts = url.split("/")
  console.log("URL PARTS", url_parts)
  for (let i = 0; i < url_parts.length; i++) {
    if (url_parts[i] == "classes" && (i + 1) != url_parts.length) {
      return parseInt(url_parts[i + 1])
    }
  }
  return -1
}

export default class Class extends Component {


  constructor(props) {
    super(props)
    const id = getSubjectId(window.location.pathname)
    console.log("ID", id)
    this.state = {
      tests: [],
      testsFetched: false,
      participants: [],
      participantsFetched: false,
      taskPools: [],
      taskPoolsFetched: false,
      privileges: {}
    };

    getPrivileges(getSubjectId(window.location.pathname))
      .then((privileges) =>
        this.setState(
          { privileges }
        )
      )

    axios.get('/api/pool/pools/' + id)
      .then(response => {
        const data = response.data
        console.log("POOLS", data)
        this.setState({
          taskPools: data,
          taskPoolsFetched: true
        })
      })
      .catch(e => { return });
    
    axios.get('/api/tests/' + id)
      .then(response => {
        const data = response.data
        console.log("TESTS", data)
        this.setState({
          tests: data,
          testsFetched: true
        })
      })
      .catch(e => { return });

    axios.get('/api/participants/' + id)
      .then(response => {
        const data = response.data
        console.log("PARTICIPANTS", data)
        this.setState({
          participants: data,
          participantsFetched: true
        })  
      })
      .catch(e => { return });
    
  }
  
  render (){
    const url = window.location.pathname
    var participants = this.state.participants
          
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
              <TaskPoolList pools={this.state.taskPools} privileges={this.state.privileges}></TaskPoolList>
              {    
                this.state.privileges && this.state.privileges.canWrite &&   
                <Button component={Link} to={url+'/newTaskPool'}>
                  <AddIcon /> Add new task pool
                </Button>
              }
            </Stack>

            {/* tests */}
            <Stack spacing={2} style={{
              'align-items': 'center',
            }}>
              <Typography variant="h5" component="h5">
                Tests
              </Typography>
              <TestsList tests={this.state.tests} privileges={this.state.privileges}></TestsList>
              {/* <AddIcon></AddIcon> */}
              {    
                this.state.privileges && this.state.privileges.canWrite &&  
                <Button component={Link} to={url+'/newTest'}>
                  <AddIcon /> Add new test
                </Button>
              }
            </Stack>

             {/* members */}
             <Stack spacing={2} style={{
              'align-items': 'center',
            }}>
              <Typography variant="h5" component="h5">
                Participants
              </Typography>
              <MembersList members={this.state.participants} privileges={this.state.privileges}></MembersList>
              {/* <AddIcon></AddIcon> */}
              <Link to={{
                  pathname: url+'/newMember',
                  state: {
                    participants
                  }
              }}
              >
                {    
                  this.state.privileges && this.state.privileges.canAdmin &&  
                  <Button>
                    <AddIcon /> Add new participant
                  </Button>
                }
              </Link>
            </Stack>
          </Stack>   
        </div>
      )
  }
}
