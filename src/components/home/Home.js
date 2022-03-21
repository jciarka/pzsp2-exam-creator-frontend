import React from "react";
import "./Home.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
  },
  {
    id: 7,
    name: "+",
    isAddButton: true
  } ]

  return (
    <div className="classes-tiles" style={
      {
        'gridTemplateColumns': 'repeat(' + Math.min(classes.length, 5) +', 1fr)',
        // 'display': 'flex',
        'justify-content': 'center',
        'align-items':'center'
      }
    }>
      {
        classes.map((classObject) => 
        !classObject.isAddButton ?
        // <Button variant="contained">Outlined</Button>
        <Button 
          component={Link} to={'/classes/' + classObject.name}
          variant="contained" 
          className="class-tile" 
          key={classObject.id} 
          style={
            {
              'backgroundColor': "#" + '91BBE7',
              'margin': '50px',
              'minHeight': '200px',
              'minWidth': '200px',
              'borderRadius': '24px',
              'fontSize': '25px'
            }}>
              
              <strong>{classObject.name}</strong>
              
        </Button>
        :
        <Button 
          component={Link} to={'addNewClass'}
          variant="contained" 
          className="class-tile" 
          key={classObject.id} 
          style={
            {
              'backgroundColor': "#" + '91BBE7',
              'margin': '50px',
              'minHeight': '150px',
              'minWidth': '150px',
              'borderRadius': '150px',
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
