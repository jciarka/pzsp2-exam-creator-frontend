import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export default function ClassCheckboxList(props) {
        
    var { classes, selectClass, classesSelected } = props
    console.log("ClassCheckboxList")
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
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {classes.map((classObject) => {
            const labelId = `checkbox-list-label-${classObject}`;

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
    );
}