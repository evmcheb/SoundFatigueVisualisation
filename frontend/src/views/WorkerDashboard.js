import React from "react";
// nodejs library that concatenates classes

import moment from "moment";
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
import FetchWorkerData from "../FetchData/FetchWorkerData";


import MyPieChart from "../variables/MyPieChart";

import "../assets/css/myDashboard.css"
import TimesConcernDisp from "../variables/TimesConcernDisp";
import AvgGauge from "../variables/AvgGauge";
import AccordionMoreData from "../variables/AccordionMoreData";
import TheDateBox, { passDate} from "../variables/TheDateBox";
import MainPage from "./MainPage";
import MaxGuage from "../variables/MaxGuage";
import { Dropdown} from 'react-bootstrap';
function WorkerDashboard(props) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = dd + '-' + mm + '-' + yyyy;
       
      


  var dateToDisplay = props.match.params.date
  var roomViewing = props.room
  var[day,month,year] = dateToDisplay.split('-')
  //If sidebar link was clicked and no room is selected
  //make user select room to display
  if(props.match.params.date.endsWith('date') || props.match.params.id.endsWith('workerid')){
      return ( 
      <>
      <div className="content">
        <Dropdown >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Display Worker:
                <i className="tim-icons icon-minimal-down" data-notify="icon" style={{padding: "15px"}}/>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{overflowY: "scroll"  ,height: "300px",width:"30%"}}>
            <Dropdown.Item href={"1~"+today}>Caleb</Dropdown.Item>
            <Dropdown.Item href={"2~"+today}>Darby</Dropdown.Item>
            <Dropdown.Item href={"3~"+today}>Aditi</Dropdown.Item>
            <Dropdown.Item href={"4~"+today}>Shane</Dropdown.Item>
            <Dropdown.Item href={"5~"+today}>Kese</Dropdown.Item>
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

      <FetchWorkerData workerid= {props.match.params.id} date = {props.match.params.date}/>
     
      </div>
      
      <div className="content">
      
        <Row>
          
            <Card className="card-chart">
            <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h4 >Viewing Room {props.match.params.id} For  {moment(`${month}/${day}/${year}`).format("LL")} </h4>
                    
                    <TheDateBox room= {props.match.params.id} date = {props.match.params.date}/>
                    
  
                    <CardTitle tag="h2">Decibel Reading </CardTitle>
                  </Col>
                  </Row>
                  
              </CardHeader>
             
                
                  {/* Main graph */}
                  <ScrollLineGraph />
                
             
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


export default WorkerDashboard;