import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import FetchData from "FetchData/FetchData.js";
import {Link} from 'react-router-dom'

// 
//import * as ChartAnnotation from 'chartjs-plugin-annotation';

// react plugin used to create charts//
/////////
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


import FetchDataTwo, { avgDecibel ,averageDecibelColour, maxDecibel, maxDbTime, lastTime} from "../FetchData/FetchDataTwo";

import AvgValue from "../variables/AvgValue";

import MyPieChart from "../variables/MyPieChart";

import "../assets/css/myDashboard.css"
import { Size } from "devextreme-react/pie-chart";
import TimesConcernDisp from "../variables/TimesConcernDisp";
import AvgGauge from "../variables/AvgGauge";
import AccordionMoreData from "../variables/AccordionMoreData";
import TheDateBox, { passDate} from "../variables/TheDateBox";

import MaxGuage from "../variables/MaxGuage";
import { Dropdown} from 'react-bootstrap';
function Dashboard(props) {

  //If sidebar link was clicked and no room is selected
  //make user select room to display
  if(props.match.params.id.endsWith('id')){
      return ( 
      <>
      <div className="content">
        <Dropdown >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Display Room:
            </Dropdown.Toggle>

            <Dropdown.Menu style={{overflowY: "scroll"  ,height: "300px",width:"30%"}}>
            <Dropdown.Item href="1">Room 1</Dropdown.Item>
            <Dropdown.Item href="2">Room 2</Dropdown.Item>
            <Dropdown.Item href="3">Room 3</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        
    </div>
    </>)
  }
  else{
  return (
    
    <>
    
    <div>
      {/* pass in what room was clicked?*/}
     
      <FetchDataTwo room= {props.match.params.id}/>
     
      </div>
      
      <div className="content">
      
        <Row>
          
            <Card className="card-chart">
            <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h4 >Room {props.match.params.id}</h4>
                    
                    <TheDateBox/>
                    
                    <button onClick={(e) => {
                        e.preventDefault();
                        window.location.href='3';
                      }} type="button" className="btn btn-info">View This Dates Data</button>
                    
                    <CardTitle tag="h2">Decibel Reading </CardTitle>
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
                <div>
                  
                  <AvgGauge/>
                </div>
                
                <div  >
                <MaxGuage/>
                 
                 
                  
                </div>
                
                <div>
            {maxDecibel} 
              </div>
                
                
                
              </Row>
              
              </div>
               
                <AccordionMoreData/>
              
            </Card>
          </Col>
        </Row>
        
      </div>
    </>
  
  );
  }
  }


export default Dashboard;