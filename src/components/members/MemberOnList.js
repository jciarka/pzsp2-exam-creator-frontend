import React, { Component } from 'react'
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Box, ListItemButton, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PopUpDeleteMember from '../PopUpDeleteMember';

export default class MemberOnList extends Component {
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

    deleteMember() {
        this.setState({deleted: true})
    }
    
    render() {
        const url = window.location.pathname
        var member = this.props.member
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
                            <AccountCircleIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={member.firstname + " " + member.lastname} secondary={member.email}/>
                        {this.state.hover ?
                        <Stack direction="row">
                            <Tooltip title="Info" placement="top">
                                <Link to={{
                                    pathname: url + '/member/' + member.userId,
                                    state: {
                                        member
                                    }
                                }}
                                >
                                    <IconButton>
                                        <InfoIcon />
                                    </IconButton>
                                </Link>
                            </Tooltip>

                            {
                                this.props.privileges && 
                                this.props.privileges.canAdmin &&
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
                    
                    <PopUpDeleteMember 
                        open={this.state.open} 
                        handleClose={this.handleClose}
                        userId={member.userId}
                        subjectId={member.subjectId}
                        id={this.id} 
                        sx= {{
                            minWidth:'1500px'
                        }}>
                    </PopUpDeleteMember>
                </Box>
                }
            </Box>
        )
    }
}
