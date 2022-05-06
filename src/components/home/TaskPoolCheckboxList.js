import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';

export default function TaskPoolCheckboxList(props) {
    var { selectTaskPool, classes, taskPoolsSelected, setTaskPoolsSelected, selectClass, classesSelected } = props    
    console.log("TaskPoolCheckboxList")

    function getActiveClassIndex() {
        return classesSelected.indexOf(true)
    }
    
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    
    const isTaskPoolSelected = (id) => {
        var class_id = getActiveClassIndex()
        if (class_id == -1){
            return false
        }
        return classes[class_id].pools[id].isSelected
    }

    return (
        <div>
        {
            classesSelected.indexOf(true) == -1 ? 
            <Typography style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                Select a class
            </Typography>
            : 
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                
                {classes[classesSelected.indexOf(true)].pools.map((taskPool) => {
                    const labelId = `checkbox-list-label-${taskPool}`;
                    const class_id = classesSelected.indexOf(true)
                    const task_pool_id = classes[class_id].pools.indexOf(taskPool)
                    

                    const handleToggle = (value, class_id, task_pool_id) => () => {
                        const currentIndex = checked.indexOf(value);
                        const newChecked = [...checked];
                
                        if (currentIndex === -1) {
                            newChecked.push(value);
                        } else {
                            newChecked.splice(currentIndex, 1);
                        }
                
                        setChecked(newChecked);

                        selectTaskPool(class_id, task_pool_id)
                    };
        
                    return (
                    <ListItem
                        key={taskPool}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={ 
                            handleToggle(taskPool, class_id, task_pool_id)
                        } dense>
                            <ListItemIcon>
                                <Checkbox
                                edge="start"
                                checked={taskPoolsSelected[class_id][task_pool_id]}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={taskPool.name} />
                        </ListItemButton>
                    </ListItem>
                    );
                })}
                
            </List>
        }
        </div>
        
    );

    // else {
    //     return(
    //     <Typography>
    //         Select a class
    //     </Typography>
    //     )
    // }
}

{/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                
                {task_pools.map((taskPool) => {
                    const labelId = `checkbox-list-label-${taskPool}`;
        
                    return (
                    <ListItem
                        key={taskPool}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(taskPool)} dense>
                        <ListItemIcon>
                            <Checkbox
                            edge="start"
                            checked={checked.indexOf(taskPool) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={taskPool.name} />
                        </ListItemButton>
                    </ListItem>
                    );
                })}
                
            </List> */}