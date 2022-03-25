import * as React from 'react';
import List from '@mui/material/List';
import { Component } from 'react';
import TaskPool from './TaskPoolOnList';
import { Box } from '@mui/system';

class TaskPoolList extends Component{


  render(){

    var task_pools = this.props.pools;
    console.log(task_pools)
    
    return (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
          task_pools.length > 0 
          ? 
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
              task_pools.map((task_pool) => 
              <TaskPool taskPool={task_pool}/>)
            }
            
          </List>
          :
          <Box style={{
              textAlign:"center"
          }}>
            No task pools found. Start with creating your first one right now!
          </Box>
        }
      </Box>
    );
  }
}

export default TaskPoolList