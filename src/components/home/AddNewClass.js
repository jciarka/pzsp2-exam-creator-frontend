import { Alert, Button, Snackbar, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import PopUp from './PopUp'
import commons from '../../commons'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'
import { Box } from '@mui/system'
import { useHistory } from "react-router-dom";

  
var AddNewClass = () =>  {
  const history = useHistory();

  const account = useSelector((state) => state.account);

  var classes = JSON.parse(localStorage.getItem("subjects"))
  var addedSubjectId = null

  console.log("ACCOUNT", account)
  
  function submit() {
    console.log("SUBMIT", classes)
    console.log("TOKEN: ", `Bearer ${account.token}`)

    console.log("abb: ", subjectAbbreviation)
    console.log("name: ", subjectFullName)

    var body = { 
      name: subjectAbbreviation,
      description: subjectFullName
    }
    axios.post(commons.baseURL + '/api/subjects', body)
      .then(response => {
        const data = response.data
        console.log("ADD NEW CLASS", data)
        addedSubjectId = response.data.model.id
        importTaskPools()
        history.push("/")
      })
      .catch(e => { return });
  }

  function importTaskPools(){
    console.log("importTaskPools")
    var body = getSelectedPools()
    
    axios.post(commons.baseURL + '/api/pool/import/' + addedSubjectId, body)
      .then(response => {
        const data = response.data
        console.log("TASKS IMPORTED", data)
      })
      .catch(e => { return });
  }

  console.log("CLASSES", classes)
  
  // var classesSelected = new Array(classes.length)

  function getSelectedPools() {
    var sel_pools = []
    let i = 0;
    for (var c of classes){
      let j = 0;
      for (var p of c.pools){
        if (taskPoolsSelected[i][j]){
          sel_pools.push(p.id)
        }
        j++;
      }
      i++;
    }
    console.log("SELECTED POOLS", sel_pools)
    return sel_pools
  }
  
  function initTaskPoolsSelected() {
    var result = []
    for (var c of classes){
      result.push(Array(c.pools.length).fill(false))
    }
    return result
  }

  const [classesSelected, setClassesSelected] = React.useState(Array(classes.length).fill(false))
  const [taskPoolsSelected, setTaskPoolsSelected] = React.useState(initTaskPoolsSelected())
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
 
    setAlertOpen(true)
  };

  const selectClass = (value) => {
    var newClassesSelected = classesSelected
    console.log("selectClass", value)
    if (newClassesSelected[value] ){
      newClassesSelected[value] = false
    } else {
      newClassesSelected.fill(false)
      newClassesSelected[value] = true
    }
    console.log("classesSelected", classesSelected)
    setClassesSelected(newClassesSelected)
  }

  const selectTaskPool = (class_id, task_pool_id) => {
    console.log("SELECTTASKPOOl", class_id, task_pool_id)
    // classes[class_id].task_pools[task_pool_id].isSelected = 
    // !classes[class_id].task_pools[task_pool_id].isSelected
    
    var newTaskPoolsSelected = taskPoolsSelected
    taskPoolsSelected[class_id][task_pool_id] = !taskPoolsSelected[class_id][task_pool_id]
    setTaskPoolsSelected(newTaskPoolsSelected)
    console.log(taskPoolsSelected)
  }

  const [alertOpen, setAlertOpen] = React.useState(false);

  var [subjectFullName, setSubjectFullName] = useState("")
  var [subjectAbbreviation, setSubjectAbbreviation] = useState("")


  function handleNameChange(e) {
    setSubjectFullName(e.target.value)
    console.log(subjectFullName)
  }

  function handleAbbChange(e) {
    setSubjectAbbreviation(e.target.value)
    console.log(subjectAbbreviation)
  }

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  function countImportedPools() {
    var result = 0
    for (var c of taskPoolsSelected) {
      for (var ts of c) {
        if (ts) {
          result += 1
        }
      }
    }
    return result
  }

  return (
    
        <Stack 
        spacing={2}
        style={{
          width:'350px'
        }}>
          <TextField id="outlined-basic" label="Class name" variant="outlined" onChange={(event) => handleNameChange(event)}/>
          <TextField id="outlined-basic" label="Abbreviation" variant="outlined" onChange={(event) => handleAbbChange(event)}/>
          {/* <Typography>Import existing task pools //to do</Typography> */}
          
          <Button 
          variant="contained" 
          disableElevation
          onClick={handleClickOpen}>
            Import existing tasks
          </Button>
          <PopUp
            selectClass={selectClass}
            selectTaskPool={selectTaskPool}
            taskPoolsSelected={taskPoolsSelected}
            setTaskPoolsSelected={setTaskPoolsSelected}
            open={open}
            onClose={handleClose}
            classes={classes}
            classesSelected={classesSelected}
          />
          
          <Button variant="contained" disableElevation onClick={() => {
              submit()
            }}>
            Submit
          </Button>
    
    
          <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
          {countImportedPools() == 0 ? 
            <Alert onClose={handleAlertClose} severity="info" sx={{ width: '100%' }}>
              No task pools imported 
            </Alert>
          :
            <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
              Successfully imported {countImportedPools()} task pools
            </Alert>
          
          }
          </Snackbar>
        </Stack>
       
  )
  
}

export default AddNewClass