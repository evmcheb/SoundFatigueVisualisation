import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts//
/////
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


import FetchDataTwo, { avgDecibel ,averageDecibelColour, maxDecibel, maxDbTime} from "../FetchData/FetchDataTwo";

import AvgValue from "../variables/AvgValue";

import MyPieChart from "../variables/MyPieChart";

import "../assets/css/myDashboard.css"
import { Size } from "devextreme-react/pie-chart";
import TimesConcernDisp from "../variables/TimesConcernDisp";

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
             
                
                  {/* Main graph */}
                  <ScrollLineGraph/>
                
             
            </Card>
      
          <Col lg="">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Data</h5>
                
              </CardHeader>

              <div>
                <Row>
                <div className="thePieChart" style={{padding: "25px"}}>
                <MyPieChart/>
                </div>
                
                <div style={{padding: "25px"}} >
                  <h2>Average Decibels</h2>
                <div className="averageDbDisplay"style={{background: averageDecibelColour}}>
                  {avgDecibel.toFixed(2)} dB
                </div>
                </div>
                <div style={{padding: "25px"}} >
                  <h2>Maximum Decibels</h2>
                  <div className = "maxDbDisplay"style={{fontSize: "25px"}} >
                    {maxDecibel} db <br/>
                    Occured at: {maxDbTime}
                  </div>
                </div>
              </Row>
              <div>
              
                <div>
                  Times of concern:<br/>
                  
                  <TimesConcernDisp/>
                </div>
              
              </div>
              </div>
              <CardBody>
                Average Decibels = {avgDecibel}
                <div className="chart-area">
                  
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