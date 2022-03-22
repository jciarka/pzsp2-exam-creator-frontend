import React from "react";
import "./Home.css";
import { Avatar, Box, Button } from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Stack } from "@mui/material";
import { AddBox } from "@material-ui/icons";

const Home = () => {

  var classes = [
  {
    id: 1,
    name: "PZSP1"
  },
  {
    id: 2,
    name: "PZSP2"
  },
  {
    id: 3,
    name: "BSS"
  },
  {
    id: 4,
    name: "POP"
  },
  {
    id: 5,
    name: "WSI"
  },
  {
    id: 6,
    name: "MNUM"
  }]


  return (
    <Stack
      direction="row"
      
      // style={{
      //   'display': 'grid',
      //   'place-items': 'center',
      //   'width':'100%'
      // }}
    >
      
      <div className="classes-tiles" style={
        {
          'gridTemplateColumns': 'repeat(' + Math.min(classes.length, 4) +', 1fr)',
          // 'display': 'flex',
          'justify-content': 'center',
          'align-items':'center',
          'marginRight':'50px'
        }
      }>
        {
          classes.map((classObject) => 
          
          <Button 
            component={Link} to={'/classes/' + classObject.name}
            variant="contained" 
            className="class-tile" 
            key={classObject.id} 
            style={
              {
                'backgroundColor': "#" + '91BBE7',
                'margin': '20px',
                'minHeight': '200px',
                'minWidth': '200px',
                'borderRadius': '24px',
                'fontSize': '25px'
              }
            }
            >
                
              <strong>{classObject.name}</strong>
                
          </Button>
          
          )
        }
      </div>
      <Button  
        variant="contained"  
        component={Link} to={'/addNewClass'}
        sx={{
        
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop: '20px',
        marginBottom: '20px',
        minWidth: '180px',
        borderRadius: '24px',
        
      }}>
          <AddBox style={{
          width: '70px',
          height: '70px'
        }}>

          </AddBox>
      </Button>
    </Stack>
  );
};

export default Home;
