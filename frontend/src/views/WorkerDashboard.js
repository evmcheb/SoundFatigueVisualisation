import React from "react";
// nodejs library that concatenates classes

import moment from "moment";
import ScrollLineGraph from "variables/ScrollLineGraph"
import WorkerGraph from "variables/WorkerGraph"
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

import FetchWorkerData from "../FetchData/FetchWorkerData";


import WorkerPieChart from "../variables/WorkerPieChart";

import "../assets/css/myDashboard.css"

import AccordionWorkerDash from "../variables/AccordionWorkerDash";
import TheDateBox, { passDate} from "../variables/TheDateBox";
import MainPage from "./MainPage";
import MaxWorkerGuage from "../variables/MaxWorkerGuage";
import { Dropdown} from 'react-bootstrap';
import AverageWorkGauge from "variables/AverageWorkGuage";
import VerticalBulletWorker from "variables/VerticalBulletWorker";
import TotalDosageGuage from "variables/TotalDosageGuage";
import BulletChartGroup from "variables/BulletChartGroup";
function WorkerDashboard(props) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = dd + '-' + mm + '-' + yyyy;
       
      


  var dateToDisplay = props.match.params.date
  
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

      <FetchWorkerData id= {props.match.params.id} date = {props.match.params.date}/>
     
      </div>
      
      <div className="content">
      
        <Row>
          
            <Card className="card-chart">
            <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h4 >Viewing WorkerID {props.match.params.id} For  {moment(`${month}/${day}/${year}`).format("LL")} </h4>
                    
                    <TheDateBox id= {props.match.params.id} date = {props.match.params.date}/>
                    
  
                    <CardTitle tag="h2">Decibel Reading </CardTitle>
                  </Col>
                  </Row>
                  
              </CardHeader>
             
                
                  {/* Main graph */}
                  <WorkerGraph />
                
             
            </Card>
      
          <Col lg="">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Data</h5>
                
              </CardHeader>

              <div>
                <Row>
                <div className="thePieChart" style={{padding: "25px"}}>
                    <WorkerPieChart/>
                
                </div>
                <div>
                   
                  <AverageWorkGauge/>
                </div>
                
                <div  >
                         <MaxWorkerGuage/> 
              
                 
                 
                  
                </div>
                
                <div>
           
              </div>
                
                
                
              </Row>
              
              </div>
              
              
            </Card>
          </Col>
        </Row>
        <Row>

          <Card className="card-chart">
              <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      
                      
                      

                      <CardTitle tag="h2">Dosimeter </CardTitle>
                    </Col>
                    </Row>
                    
                </CardHeader>
              
                  
            
                  
                  <TotalDosageGuage/>
                  <BulletChartGroup/>
              
              </Card>
          </Row>
        <Row>

        <Card className="card-chart">
            <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    
                    
                    
  
                    <CardTitle tag="h2">Averages Over 24 Hours </CardTitle>
                  </Col>
                  </Row>
                  
              </CardHeader>
             
                
                  {/* Main graph 
                  
                  <TotalDosageGuage/>
              
              <BulletChartGroup/>
                  */}
                 
                  <VerticalBulletWorker/>
             
            </Card>
        </Row>
        
      </div>
    </>
  
  );
  }
  }


export default WorkerDashboard;