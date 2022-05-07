import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
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
import userEvent from '@testing-library/user-event';
import { getPrivileges } from '../../commons'

const Member = ({props}) => {
  const { class_id, member_id } = useParams()
  const [open, setOpen] = useState(false);
  const [member, setMember] = useState(false);
  const [privs, setPrivs] = useState({});

  const getParticipant = async () => {
    const result = await axios.get(`/api/participants/${class_id}/${member_id}`)
    
    if (result && result.status === 200) {
      setMember(result.data)
    }
  } 

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

  async function deleteRoleFromUser(userId, subjectId, roleName)
  {
    const response = await axios.delete(`/api/subjectuser/${subjectId}/${userId}/roles/${roleName}`)
    if(response.status === 200 && response.data.ok ) {
      getParticipant()
    }
  }

  function createData(key, name, info) {
    return { key, name, info};
  }

  useEffect(async () => {
    getParticipant()
    setPrivs(await getPrivileges(class_id))
  }, []);

  const rows = [
        createData('Id', 'Id', member.userId),
        createData('Name','Name', member.firstname),
        createData('Surname','Surname', member.lastname),
        createData('Email','Email', member.email),
        createData('Institute', 'Institute', (member.institute == null ? 'unspecified' : member.institute)),
        createData(
          'Roles',
          <div className="d-flex justify-content-start">
            <div style={{"marginTop": "10px", marginRight: "5px"}} >
              Role
            </div>
            {
              privs.canAdmin &&
              <IconButton size='small' className='d-block' variant="outlined" style={{"backgroundColor" : "#1976d2", color: 'white' }} 
                aria-label="delete" onClick={() => { handleOpen() }}>
                <AddIcon />
              </IconButton>
            }
          </div>,  
          
          (member.subjectRoles ? 
            <>
              <div style={{"marginRight": privs.canAdmin ? "35px" : "0px", "marginTop": "5px", "marginBottom": "0px"}}>
                READ
              </div>
              {
                member.subjectRoles.map(x =>  
                <div key={x.roleName} className='d-flex justify-content-end'>
                  <div key={x.roleName} style={{"marginTop": "10px"}}>
                    {x.name}
                  </div>
                  {
                    privs.canAdmin &&
                    <IconButton 
                        key={x.roleName} 
                        className='d-block' 
                        size="small" 
                        color="error" 
                        aria-label="delete" 
                        onClick={
                          () => { 
                            deleteRoleFromUser(member.userId, member.subjectId, x.name)
                          }
                          }>
                      <DeleteIcon size="small" />
                    </IconButton>                    
                  }

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
          userId={member.userId}
          subjectId={class_id}
          onCancel={handleClose}
          onSuccess={() => {
            getParticipant()
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
          <Link to={`/classes/${class_id}`} className="rounded-0">
            <Button variant="outlined" startIcon={<ArrowBackIosIcon/>}>
              Back
            </Button>
          </Link>
        </Stack>
      </Container>
    </> 
    );
 
}

export default Member



