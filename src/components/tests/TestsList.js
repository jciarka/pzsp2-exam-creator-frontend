import React, { Component } from 'react'
import List from '@mui/material/List';
import TaskPool from './TestOnList';

export default class TestsList extends Component {
    
    render() {
        var tests_list = this.props.tests;
    
        return (
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                tests_list.map((test) => 
                <TaskPool test={test}/>)
                }
            
            </List>
        )
    }
}
