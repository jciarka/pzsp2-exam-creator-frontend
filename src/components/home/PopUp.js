import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TasksSelection from './TasksSelection';
import { Button } from '@mui/material';


export default function PopUp(props) {
    var {  selectClass, selectTaskPool, taskPoolsSelected, setTaskPoolsSelected, open,  onClose, classes, classesSelected } = props;

    console.log("POPUP", classes)
    const handleClose = () => {
        onClose(false);
    };


    return (
        <Dialog onClose={handleClose} open={open} style={{
            
        }}>

            <DialogTitle>Choose task pools you want to import</DialogTitle>
            {/* <Checkbox {...label} defaultChecked onChange={() => handleListItemClick(true)}/> */}
            <TasksSelection 
            selectClass={selectClass} 
            selectTaskPool={selectTaskPool} 
            taskPoolsSelected={taskPoolsSelected}
            setTaskPoolsSelected={setTaskPoolsSelected}
            classes={classes} 
            classesSelected={classesSelected}>
            </TasksSelection>
            <Button variant="contained" onClick={() => {handleClose()}} disableElevation style={{
                margin: '20px'
            }}>Import</Button>
        </Dialog>
    );
}

PopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectClass: PropTypes.string.isRequired,
};
