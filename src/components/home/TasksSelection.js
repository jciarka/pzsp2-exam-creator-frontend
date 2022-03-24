import * as React from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ClassCheckboxList from './ClassCheckboxList';
import TaskPoolCheckboxList from './TaskPoolCheckboxList';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';

export default function TasksSelection(props) {
    var { selectClass, selectTaskPool,  taskPoolsSelected, setTaskPoolsSelected, classes, classesSelected } = props

    console.log("TASKSSELECTION", taskPoolsSelected)

    // const selectClass = (value) => {
    //     var newClassesSelected = classesSelected
    //     console.log("selectClass", value)
    //     if (newClassesSelected[value] ){
    //       newClassesSelected[value] = false
    //     } else {
    //       newClassesSelected.fill(false)
    //       newClassesSelected[value] = true
    //     }
    //     console.log("classesSelected", classesSelected)
    //     classesSelected = newClassesSelected
    // }
    

    return (
        <Box sx={{ width: '100%' }}>
            <Stack direction="row" spacing={2} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box style={{
                    width:"500px",
                    height:"500px",
                    marginLeft: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    {/* class checkbox list */}
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {classes.map((classObject) => {
                        const labelId = `checkbox-list-label-${classObject}`;
                        const [checked, setChecked] = React.useState([0]);

                        const handleToggle = (value, id) => () => {
                            const currentIndex = checked.indexOf(value);
                            const newChecked = [...checked];

                            if (currentIndex === -1) {
                                newChecked.push(value);
                            } else {
                                newChecked.splice(currentIndex, 1);
                            }

                            setChecked(newChecked);

                            // selecting classes
                            selectClass(id)
                        };

                        return (
                        <ListItem
                            key={classObject.id}
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(classObject, classes.indexOf(classObject))} dense>
                            <ListItemIcon>
                                <Checkbox
                                edge="start"
                                checked={classesSelected[classes.indexOf(classObject)]}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={classObject.name} />
                            </ListItemButton>
                        </ListItem>
                        );
                    })}
                    </List>
                
                
                
                </Box>
            
                {/* icon > */}
                <NavigateNextIcon style={{
                    margin: '30px'
                }}></NavigateNextIcon>


                {/* task pools checkbox list */}
                <Box style={{
                    width:"500px",
                    height:"500px",
                    marginRight: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                    
                }}>
                    <TaskPoolCheckboxList 
                    selectClass={selectClass} 
                    selectTaskPool={selectTaskPool} 
                    taskPoolsSelected={taskPoolsSelected}
                    setTaskPoolsSelected={setTaskPoolsSelected}
                    classes={classes} 
                    classesSelected={classesSelected}/>
                    
                </Box>

            </Stack>
        </Box>
    );
}