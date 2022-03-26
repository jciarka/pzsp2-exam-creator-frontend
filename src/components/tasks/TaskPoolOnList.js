import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import { Component } from 'react';
import { IconButton, ListItemButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PopUpDelete from '../PopUpDelete';
import { Box } from '@mui/system';

class TaskPoolOnList extends Component {
    constructor(props){
        super(props)
        this.state = {
            hover: false,
            open: false,
        };
        this.onMouseOverHandler = this.onMouseOverHandler.bind(this)
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    
    onMouseOverHandler(){
       this.setState({hover: true})
    }

    onMouseLeaveHandler(){
        this.setState({hover: false})
    }

    handleClose() {
        this.setState({open: false})
    }
    
    render(){
        const url = window.location.pathname
        console.log(url)
        var task_pool = this.props.taskPool
        return (
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
                    <ListItemText primary={task_pool.name} secondary="Created Jan 9, 2014" />
                    {this.state.hover ?
                    <Stack direction="row">
                        <Tooltip title="Edit" placement="top">
                            <IconButton component={Link} to={url+'/pool/'+task_pool.id}>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" placement="top">
                            <IconButton onClick={() => {
                                this.setState({open: true})
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    : null}

                </ListItemButton>

                <PopUpDelete open={this.state.open} handleClose={this.handleClose}  sx= {{
                    minWidth:'1500px'
                }}>
                </PopUpDelete>
            </Box>
        )
    }
}


export default TaskPoolOnList