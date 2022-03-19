import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function createShortText(text){
  const letters = 30
  var res = text.substring(0, letters);
  if (text.length > letters) {
    res += "..."
  }
  return res
}


export default function TaskPool() {
  var tasks= [
    {
      id: 1,
      text: "Rozwiaz rownanie x^2 = 4",
      isOpen: false,
      numberOfAnswers: 0
    },
    {
      id: 2,
      text: "Rozwiaz rownanie x^2 = 9",
      isOpen: false,
      numberOfAnswers: 0
    },
    {
      id: 3,
      text: "Rozwiaz rownanie x^2 = 1",
      isOpen: false,
      numberOfAnswers: 0
    },
    {
      id: 4,
      text: "Rozwiaz rownanie x^2 = 12",
      isOpen: false,
      numberOfAnswers: 0
    },
  ]

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };



  return (
    

    <div>
      {
      tasks.map((task) => 
      <Accordion expanded={expanded === task.id} onChange={handleChange(task.id)} style={{
        'width': '800px'
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Task nr {task.id}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{createShortText(task.text)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {task.text}
          </Typography>
        </AccordionDetails>
      </Accordion>

      )}
      
    </div>
  );
}