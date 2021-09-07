import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts

import ScrollLineGraph from "variables/ScrollLineGraph"
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";


import FetchDataTwo from "../FetchData/FetchDataTwo";

import AvgValue from "../variables/AvgValue";


function Dashboard(props) {
  
  return (
    <>
    <div>
      <FetchDataTwo/>
      
      </div>
      
      <div className="content">
      
        <Row>
          
            <Card className="card-chart">
            <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Room A</h5>
                    <CardTitle tag="h2">Decibel Reading</CardTitle>
                  </Col>
                  </Row>
              </CardHeader>
             
                
                  {/* CHANGE GRAPH HERE */}
                  <ScrollLineGraph/>
                
             
            </Card>
      
          <Col lg="">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Data</h5>
                
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <AvgValue/>
                  Max Decibles, AVG Decibles
                  Times where sound was loudest
                  And Who has been in this room on this date
                  
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </div>
    </>
  );
}

export default Dashboard;