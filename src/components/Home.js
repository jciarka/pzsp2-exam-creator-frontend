import React from "react";
import "./Home.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {

  function handleOnClick (className) {
    console.log(className)
  }

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
  },
  {
    id: 7,
    name: "+"
  } ]

  return (
    <div className="classes-tiles" style={
      {
        'gridTemplateColumns': 'repeat(' + Math.min(classes.length, 4) +', 1fr)'
      }
    }>
      {
        classes.map((classObject) => 
        // <Button variant="contained">Outlined</Button>
        <Button 
          component={Link} to={'/classes/' + classObject.name}
          variant="contained" 
          className="class-tile" 
          key={classObject.id} 
          onClick={() => {
            handleOnClick(classObject.name)
          }} 
          link = '\abc'
          style={
            {
              'backgroundColor': "#" + '91BBE7',
              'margin': '50px',
              'minHeight': '200px',
              'minWidth': '200px',
              'borderRadius': '24px',
              'display': 'flex',
              'justifyContent': 'center',
              'alignItems': 'center',
              'fontSize': '25px'
            }}>
              
              <strong>{classObject.name}</strong>
              
        </Button>

        )
      }
    </div>
  );
};

export default Home;
