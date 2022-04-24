import React from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Member = ({props}) => {
      const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });
      


  function createData(name, info) {
    return { name, info};
  }


  var mem = props.location.state.member
  const rows = [
        createData('Id', mem.id),
        createData('Name', mem.firstname),
        createData('Surname', mem.lastname),
        createData('Email', mem.email),
        createData('Institute', (mem.institute == null ? 'unspecified' : mem.institute)),
        createData('Role', (mem.position == null ? 'read-only' : mem.position)),
    ];
    
    const classes = useStyles();
    

    return (
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
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.info}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <Stack  direction="row" spacing={2} margin={5} justify-content="center" alignItems="center" sx={{ width: 500 }}>
        <Button variant="outlined" startIcon={<ArrowBackIosIcon/>} justifyItems="center">
          Back
        </Button>
        <Button variant="contained" endIcon={<EditIcon />} justifyItems="center">
          Edit role
        </Button>
      </Stack>
      </Container>

    );
  
}

export default Member



