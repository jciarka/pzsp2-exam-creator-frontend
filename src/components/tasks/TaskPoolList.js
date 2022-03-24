import * as React from 'react';
import List from '@mui/material/List';
import { Component } from 'react';
import TaskPool from './TaskPoolOnList';

class TaskPoolList extends Component{


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