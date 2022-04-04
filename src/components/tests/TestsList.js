import React, { Component } from 'react'
import List from '@mui/material/List';
import TaskPool from './TestOnList';
import { Box } from '@mui/system';
import TestOnList from './TestOnList';

export default class TestsList extends Component {
    
    render() {
        var tests_list = this.props.tests;
    
        return (
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    tests_list.length > 0 
                    ? 
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {
                        tests_list.map((test) => 
                        <TestOnList test={test}/>)
                        }
                    </List>
                    : 
                    <Box style={{
                        textAlign:"center"
                    }}>
                        No tests found. Create your first one using tasks from existing task pools!
                    </Box>
                }

            </Box>

        )
    }
}
