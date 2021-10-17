import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BulletChartGroup from './BulletChartGroup';
import TotalDosageGuage from './TotalDosageGuage'
import { ThemeContext } from "contexts/ThemeContext";


const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    
  },
}));

export default function AccordionWorkerDash() {
  const classes = useStyles();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={classes.root}>
      <Accordion style={ theme==='white-content'? {  backgroundColor:'white',overflow: 'auto', color:'black', fontSize: 24, fontWeight: 10}:{backgroundColor:'#817F99',overflow: 'auto', color:'white', fontSize: 24, fontWeight: 10}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}></Typography>
          <span style={ theme==='white-content'? { color:'black'}:{color:'white'}}>Dosimeter</span>
        </AccordionSummary>
        <AccordionDetails >
            
             
             
              
             <div  style={{ width:'100%'}}>
             <BulletChartGroup/>
           
             </div>
             <div  style={{ width:'100%',padding:"35px"}}>
              <TotalDosageGuage/>
              
              
             </div>
            
           
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}