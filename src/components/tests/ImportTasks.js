import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState, useEffect } from 'react';
import axios from "axios";
import PoolOnList from './PoolOnList';



const ImportTasks = () => {
    const { class_id, test_id } = useParams()
    const [pools, setPools] = useState([])

      useEffect(() => {
        axios
            .get(`api/pool/pools/${class_id}`)
            .then((response) => {
                const data = response.data;
                setPools([...data])
                console.log('data', data)
                console.log('pools', pools)
              });        
      }, []); 

    const onClick = () => {
        console.log(pools)
    }

  return (
    <Container>
        <Stack spacing={3} sx={{ width: 500 }}>
        {
        pools.map((pool) =>
          <PoolOnList pool={pool} />
            
        )
        }
        
        <Stack  direction="row" spacing={2} margin={5} justify-content="center" alignItems="center" sx={{ width: 500 }}>
            <Link to={`/classes/${class_id}/test/${test_id}`} className="rounded-0">
                <Button variant="outlined" startIcon={<DeleteIcon />} > 
                    Cancel
                </Button>
            </Link>
                <Button variant="contained" endIcon={<SendIcon />} onClick={onClick}>
                    Submit
                </Button>
        </Stack>
    </Stack>
  </Container>
  );
}
  
export default ImportTasks;


  
  

  