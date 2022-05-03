import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from "@mui/material/Dialog";
import axios from 'axios';
import AddSubjectRoleToMember from './AddSubjectRoleToMember'

const Member = ({props}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
      
  // async function getParticipant(subjectId) {
  //   axios.get(`/api/participant/${props.location.state.member}/${}`)
  //   .then(response => {
  //     const data = response.data
  //     console.log("PARTICIPANTS", data)
  //     this.setState({
  //       participants: data,
  //       participantsFetched: true
  //     })
  //   });
  // }

  async function deleteRoleFromUser(userId, subjectId, roleName)
  {
    const response = await axios.delete(`/api/subjectuser/${subjectId}/${userId}/roles/${roleName}`)
    if(response.status === 200 && response.data.ok ) {
      // TO DO: refresh data
    }
  }

  console.log(props)

  var mem = props.location.state.member

  function createData(key, name, info) {
    return { key, name, info};
  }

  const rows = [
        createData('Id', 'Id', mem.userId),
        createData('Name','Name', mem.firstname),
        createData('Surname','Surname', mem.lastname),
        createData('Email','Email', mem.email),
        createData('Institute', 'Institute', (mem.institute == null ? 'unspecified' : mem.institute)),
        createData(
          'Roles',
          <div className="d-flex justify-content-start">
            <div style={{"marginTop": "10px", marginRight: "5px"}} >
              Role
            </div>
            <IconButton size='small' className='d-block' variant="outlined" style={{"backgroundColor" : "#1976d2", color: 'white' }} 
              aria-label="delete" onClick={() => { handleOpen() }}>
              <AddIcon />
            </IconButton>
          </div>,  
          
          (mem.subjectRoles ? 
            <>
              <div style={{"marginRight": "35px", "marginTop": "5px", "marginBottom": "5px"}}>
                READ
              </div>
              {
                mem.subjectRoles.map(x =>  
                <div key={x.roleName} className='d-flex justify-content-end'>
                  <div key={x.roleName} style={{"marginTop": "10px"}}>
                    {x.name}
                  </div>
                  <IconButton key={x.roleName} className='d-block' size="small" color="error" aria-label="delete" onClick={() => deleteRoleFromUser(mem.userId, mem.subjectId, x.name)}>
                    <DeleteIcon size="small" />
                  </IconButton>
                </div>
                )
              }
            </>
            : 'READ')
          ),
    ];
    
    const classes = useStyles();
    

    return (
      <>
      <Dialog open={open} onClose={handleClose}>
        <AddSubjectRoleToMember 
          userId={mem.userId}
            // TO DO: data from prop
          subjectId={2}
          onCancel={handleClose}
          onSuccess={() => {
            // TO DO: refresh data
            handleClose();
          }}
        />
      </Dialog> 

      <Container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Value</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell key={row.id} component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell key={row.id} align="right">{row.info}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
          <Stack  direction="row" spacing={2} margin={5} justify-content="center" alignItems="center" sx={{ width: 500 }}>
          <Button variant="outlined" startIcon={<ArrowBackIosIcon/>}>
            Back
          </Button>
        </Stack>
      </Container>
    </> 
    );
 
}

export default Member



