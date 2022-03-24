import * as React from 'react';
import List from '@mui/material/List';
import { Component } from 'react';
import Member from './MemberOnList';

class MembersList extends Component{
  render(){

    var members = this.props.members;
    
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
        members.map((member) => 
        <Member member={member}></Member>)
        }
        
      </List>
    
    );
  }
}

export default MembersList