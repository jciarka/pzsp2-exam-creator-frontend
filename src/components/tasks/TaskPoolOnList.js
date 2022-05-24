import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import { Component } from 'react';
import { IconButton, ListItemButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import PopUpDeletePool from '../PopUpDeletePool';
import { Box } from '@mui/system';

function createShortText(text){
    if (!text)
    {
      return "";
    }
    const letters = 20
    var res = text.substring(0, letters);
    if (text.length > letters) {
      res += "..."
    }
    return res
}

class TaskPoolOnList extends Component {
    constructor(props){
        super(props)
        this.state = {
            hover: false,
            open: false,
            deleted: false
        };
        this.onMouseOverHandler = this.onMouseOverHandler.bind(this)
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.id = props.taskPool.id
        this.description = props.taskPool.description
        this.name = props.taskPool.name
        this.subjectId = props.taskPool.subjectId
        console.log("TaskPoolOnList PROPS", props)
        console.log("TaskPoolOnList ID", this.id)
    }

    deleteTaskPool() {
        this.setState({deleted: true})
    }
    
    onMouseOverHandler(){
       this.setState({hover: true})
    }

    onMouseLeaveHandler(){
        this.setState({hover: false})
    }

    handleClose(isDeleted) {
        this.setState({open: false})
        if (isDeleted){
            this.setState({deleted: true})
        }
    }
    
    render(){
        const url = window.location.pathname
        console.log(url)
        var task_pool = this.props.taskPool
        const privileges = this.props.privileges

        return (
            <Box>
                {this.state.deleted
                ?
                null
                :
                <Box>
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
                        <ListItemText primary={task_pool.name} secondary={createShortText(task_pool.description)} />
                        {this.state.hover ?
                        <Stack direction="row">                         
                            <Tooltip title="Open" placement="top">
                                <IconButton component={Link} to={url+'/pool/'+task_pool.id}>
                                    <InfoIcon/>
                                </IconButton>
                            </Tooltip>
                      
                            {
                                privileges && privileges.canDelete &&
                                <Tooltip title="Delete" placement="top">
                                    <IconButton onClick={() => {
                                        this.setState({open: true})
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                        </Stack>
                        : null}

                    </ListItemButton>


                    <PopUpDeletePool open={this.state.open} 
                    handleClose={this.handleClose} 
                    id={this.id} 
                    deleteTaskPool = {this.deleteTaskPool}
                    sx= {{
                        minWidth:'1500px'
                    }}>
                    </PopUpDeletePool>
                </Box>

                }
            </Box>
            
        )
    }
}


export default TaskPoolOnList