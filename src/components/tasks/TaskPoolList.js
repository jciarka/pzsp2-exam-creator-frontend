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
import TaskPool from './TaskPoolOnList';

class TaskPoolList extends Component{

  onMouseEnterHandler(){
    console.log("ENTER")
  }

  render(){

    var task_pools = this.props.pools;
    console.log(task_pools)
    
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
          task_pools.map((task_pool) => 
          <TaskPool taskPool={task_pool}/>)
        }
        
      </List>
    
    );
  }
}

export default TaskPoolList