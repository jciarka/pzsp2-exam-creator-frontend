import React, { Component } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import FolderIcon from '@mui/icons-material/Folder';
import { ListItemButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';

export default class Member extends Component {
    constructor(props){
        super(props)
        this.state = {
            hover: false,
        };
        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this)
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this)
    }
    
    onMouseEnterHandler(){
       this.setState({hover: true})
    }

    onMouseLeaveHandler(){
        this.setState({hover: false})
    }

    render() {
        var member = this.props.member
        return (
            <ListItemButton style = {{
                'width':'350px'
            }}
            onMouseEnter={this.onMouseEnterHandler}
            onMouseLeave={this.onMouseLeaveHandler}>
                <ListItemAvatar>
                <Avatar>
                    <AccountCircleIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={member.name} secondary={member.role}/>
                {this.state.hover ?
                <Stack direction="row">
                    <IconButton>
                        <EditIcon />
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
