import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Divider } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Box } from '@mui/system';

function createShortText(text){
    if (!text)
    {
        return "";
    }
    const letters = 30
    var res = text.substring(0, letters);
    if (text.length > letters) {
        res += "..."
    }
    return res
}


export default function Exercise(props) {
    var {task} = props

    var [expanded, setExpanded] = React.useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    // var [versions, setVersions] = React.useState(["a","b"])
    // setVersions(task.versions)
    var versions = task.versions
    if (!versions){
        versions = []
    }
    console.log(versions, task.id)
    
    // React.useEffect(() => {
    //     console.log("VERSIONS", versions)

    // }, task)

    return (
        <Accordion expanded={expanded === task.id} onChange={handleChange(task.id)} style={{
            'width': '800px'
        }}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            
            >
            <AssignmentIcon style={{
                'marginRight':'10px'
            }}/>
            
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Task nr {task.id}
            </Typography>
            
            <Typography sx={{ color: 'text.secondary' }}>{createShortText(task.title)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Stack divider={<Divider orientation="horizontal" flexItem />}>
                
                <Typography style ={{
                'marginBottom':'10px'
                }}>
                    <Box sx={{ fontWeight: 'bold'}}>Title:</Box> {task.title}
                    {
                        versions.map((v, i) => 
                            <Box>
                                <Box sx={{ 
                                    fontWeight: 'bold',
                                    marginTop: "10px"
                                }}>
                                    Version {i + 1}:
                                </Box> 
                                {v.text}
                            </Box>
                        )
                    }
                </Typography>
                <Stack direction="row">
                <Tooltip title="Edit" placement="bottom">
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="bottom">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                </Stack>
            </Stack>
            </AccordionDetails>
        </Accordion>
    )
}
