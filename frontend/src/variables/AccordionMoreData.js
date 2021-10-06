import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TimesConcernDisp from './TimesConcernDisp';
import MyRangeSlider from './MyRangeSlider';
import { Card, CardHeader, CardBody, Collapse } from "reactstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();
  const [collapse, setCollapse] = useState(false);
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
      <div className="container">
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
                <TimesConcernDisp />
              </div>
              <div >
                <MyRangeSlider />
              </div>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    </div>
  );
}