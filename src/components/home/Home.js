import React, { Component } from "react";
import "./Home.css";
import { Button, CircularProgress, Divider, Tooltip } from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import { AddBox } from "@material-ui/icons";
import axios from "axios";

function getUserId(){
  const account = localStorage.getItem("persist:root")
  console.log(account)
  return JSON.parse(JSON.parse(account)["account"])["id"]
}

export default class Home extends Component  {
  
  constructor(props) {
    
    super(props)
    this.state = {
      classes: [],
      fetched: false
    };
    
    setTimeout(() => {
      
      const account = getUserId()
      console.log("USER ID", account)
      axios.get('/api/subjects/' + account)
        .then(response => {
          console.log(response.data)
          this.state.classes = response.data
          this.setState({
            classes: response.data,
            fetched: true
          })
          localStorage.setItem("subjects", JSON.stringify(response.data))
        })
        .catch(e => { return });
    }, 1)
  }

  render(){

    return (
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem style={{
          marginRight:'50px',
          marginLeft:'20px'
        }}/>}
      >
        { this.state.fetched 
        ?
        <Box>
          {
            this.state.classes.length > 0 
            ?
            <div className="classes-tiles" style={
              {
                'gridTemplateColumns': 'repeat(' + Math.min(this.state.classes.length, 4) +', 1fr)',
                // 'display': 'flex',
                'justify-content': 'center',
                'align-items':'center',
                'marginRight':'30px'
              }
            }>
              {
                this.state.classes.map((classObject) => 
                
                <Tooltip title={classObject.description} placement="top">
                  <Button 
                    component={Link} to={'/classes/' + classObject.id}
                    variant="contained" 
                    className="class-tile" 
                    key={classObject.id} 
                    style={
                      {
                        'backgroundColor': "#91BBE7",
                        'margin': '28px',
                        'minHeight': '200px',
                        'minWidth': '200px',
                        // 'borderRadius': '24px',
                        'fontSize': '25px'
                      }
                    }
                    >
                      <strong>{classObject.name}</strong>
                  </Button>
                </Tooltip>
                )
              }
            </div>
            :
            <Box style={
              {
                'display':'flex',
                'justify-content': 'center',
                'align-items':'center',
                'margin': '20px',
                'height': '200px',
                'width': '200px',
                'borderRadius': '24px',
                'fontSize': '25px',
                'textAlign':'center',
                'marginRight':'58px'
              }
            }>
              Start with creating your first subject!
            </Box>
          }
        </Box>
        :
        <Box style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems:'center',
          minWidth: '200px',
          minHeight: '200px',
        }}>
          <CircularProgress />

        </Box>
        }

  
  
  
        <Button  
          variant="contained"  
          component={Link} to={'/addNewClass'}
          sx={{
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          marginTop: '28px',
          marginBottom: '28px',
          minWidth: '200px',
          minHeight: '200px',
          borderRadius: '24px',
          
        }}>
          <AddBox style={{
            width: '70px',
            height: '70px'
          }}>
  
          </AddBox>
        </Button>
      </Stack>
    );
  }
};
