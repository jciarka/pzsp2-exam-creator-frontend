import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import FolderIcon from '@mui/icons-material/Folder';
import { Component } from 'react';
import { ListItemButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

class MembersList extends Component{
  render(){

    var members = this.props.members;
    
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {members.map((member) => 
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={member.name} secondary={member.role}/>
        </ListItemButton>)
        }
        
      </List>
    
    );
  }
}

export default MembersList