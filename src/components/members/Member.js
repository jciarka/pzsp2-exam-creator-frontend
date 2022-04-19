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

const Member = () => {
      const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

  const m_dt = { m_id: 1, m_name: 'Jan', surname:'Kowalski', email:'jankowalski@gmail.com', role: 'Admin' };
      

  function createData(name, info) {
    return { name, info};
  }
  const rows = [
        createData('id', m_dt.m_id),
        createData('name', m_dt.m_name),
        createData('surname', m_dt.surname),
        createData('email', m_dt.email),
        createData('role', m_dt.role),
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



