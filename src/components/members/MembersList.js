import * as React from 'react';
import List from '@mui/material/List';
import { Component } from 'react';
import Member from './MemberOnList';
import { Box } from '@mui/material';

class MembersList extends Component{
  render(){

    var members = this.props.members;
    
    return (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
            members.length > 0 
            ? 
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {
              members.map((member) => 
              <Member member={member}></Member>)
              }
            </List>
            :
            <Box style={{
              textAlign:"center"
            }}>
              No participants found. Add another person right now!
            </Box>
          }
      </Box>
    );
  }
}

export default MembersList