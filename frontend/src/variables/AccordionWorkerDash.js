import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BulletChartGroup from './BulletChartGroup';
import TotalDosageGuage from './TotalDosageGuage'


const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion style={{overflow: 'auto', backgroundColor:'#817F99', color:'white', fontSize: 24, fontWeight: 10}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}></Typography>
          Dosimeter
        </AccordionSummary>
        <AccordionDetails >
            
             
             
              <div  style={{ width:'100%'}}>
              <TotalDosageGuage/>
              
              <BulletChartGroup/>
             </div>
             
             
           

            
           
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}