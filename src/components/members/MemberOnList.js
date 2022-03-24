import React, { Component } from 'react'
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ListItemButton, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class MemberOnList extends Component {
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
        const url = window.location.pathname
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
                    <Tooltip title="Info" placement="top">
                        <IconButton component={Link} to={url+'/member/'+member.id}>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete" placement="top">
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
                : null}
            </ListItemButton>
        )
    }
}
