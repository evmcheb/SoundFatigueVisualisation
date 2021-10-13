import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TimesConcernDisp from './TimesConcernDisp';

import BulletChartGroup from './BulletChartGroup'
import VerticalBulletChart from './VerticalBullerChart';
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
      <Accordion style={{overflow: 'auto' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}></Typography>
          Time Data Analysis
        </AccordionSummary>
        <AccordionDetails >
            <div>
            <TimesConcernDisp/>
            </div>
            
              {/*  <MyRangeSlider
                PLACE HEAT MAP
              />  */}
              
             
              <div>
              Average Decibels Over 24 Hours
             <VerticalBulletChart/>
             
             </div>
             
             
           

            
           
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}