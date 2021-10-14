import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Card, CardHeader, CardBody, Collapse } from "reactstrap";

import VerticalBulletChart from './VerticalBulletChart';

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
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    if (isOpen) {
      setIsOpen(false)
    }
    else {
      setIsOpen(true)
    }
  }

  return (
    <div className={classes.root}>
       <Card style={{ marginBottom: '1rem', width: '100%' }}>
          <CardHeader onClick={() => toggle()} >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <span> Time Data Analysis</span>
              <div >
                <ExpandMoreIcon />
              </div>
            </div>
          </CardHeader>
          <Collapse isOpen={isOpen} >
            <CardBody >
              <div >
              <p style={{color:'gray',marginLeft:10}}>Average Decibels Over 24 Hours</p>
                 <VerticalBulletChart/>
              </div>
              
            </CardBody>
          </Collapse>
        </Card>     
    </div>
  );
}