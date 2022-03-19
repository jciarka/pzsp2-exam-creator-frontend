import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import FolderIcon from '@mui/icons-material/Folder';
import { Component } from 'react';
import { IconButton, ListItemButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class TaskPoolOnList extends Component {
    constructor(props){
        super(props)
        this.state = {
            hover: false,
        };
        this.onMouseOverHandler = this.onMouseOverHandler.bind(this)
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this)
    }
    
    onMouseOverHandler(){
       this.setState({hover: true})
    }

    onMouseLeaveHandler(){
        this.setState({hover: false})
    }
    
    render(){
        const url = window.location.pathname
        console.log(url)
        var task_pool = this.props.taskPool
        return (
            <ListItemButton style = {{
                'width':'350px'
            }}
            onMouseOver={this.onMouseOverHandler}
            onMouseLeave={this.onMouseLeaveHandler}>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={task_pool.name} secondary="Created Jan 9, 2014" />
                {this.state.hover ?
                <Stack direction="row">
                    <IconButton component={Link} to={url+'/pool/'+task_pool.id}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
                : null}

            </ListItemButton>
        )
    }
}


export default TaskPoolOnList