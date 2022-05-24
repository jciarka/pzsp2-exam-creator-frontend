import React, { Component } from 'react'
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ListItemButton, Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import FeedIcon from '@mui/icons-material/Feed';
import PopUpDeleteTest from '../PopUpDeleteTest';
import { Box } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';


function getNoExercises(exercises){
    if (!exercises){
        return 0
    }
    return exercises.length
}

export default class TestOnList extends Component {
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
    
    render() {
        const url = window.location.pathname
        var test = this.props.test
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
                            <FeedIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={test.description} 
                        secondary={"Number of exercises:" 
                        + getNoExercises(test.exercises)
                        
                        }/>
                        {this.state.hover ?
                        <Stack direction="row">              
                            <Tooltip title="Open" placement="top">
                                <IconButton component={Link} to={url+'/test/'+test.id}>
                                    <InfoIcon />
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

                    <PopUpDeleteTest open={this.state.open} id={test.id} handleClose={this.handleClose} sx= {{
                        minWidth:'1500px'
                    }}>
                    </PopUpDeleteTest>
                </Box>
                }
            </Box>
        )
    }
}

