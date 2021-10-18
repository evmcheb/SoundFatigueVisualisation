import React, { useContext } from 'react';

import moment from "moment";
import ScrollLineGraph from "variables/ScrollLineGraph"
// reactstrap components
import {

  Card,
  CardHeader,

  CardTitle,

  Row,
  Col,
} from "reactstrap";


import FetchRoomData from "../FetchData/FetchRoomData";

import PitchGraph from "../variables/PitchGraph";

import MyPieChart from "../variables/MyPieChart";

import "../assets/css/myDashboard.css"


import AvgGauge from "../variables/AvgGauge";

import TheDateBox from "../variables/TheDateBox";
import MainPage from "./MainPage";
import MaxGuage from "../variables/MaxGuage";
import { ThemeContext } from "contexts/ThemeContext";

import VerticalBulletChart from "variables/VerticalBulletChart";
function Dashboard(props) {
  const { theme } = useContext(ThemeContext);


  var dateToDisplay = props.match.params.date
  var[day,month,year] = dateToDisplay.split('-')
  //If sidebar link was clicked and no room is selected
  //make user select room to display
  if(props.match.params.date.endsWith('date') || props.match.params.id.endsWith('id')){
      return ( 
      <>
      <div className="content">
        <MainPage/>
      </div>
    </>)
  }
  else{
  return (
    
    <>
    
    <div>
      {/* pass in what room was clicked?*/}
     
      <FetchRoomData room= {props.match.params.id} date = {props.match.params.date}/>
     
      </div>
      
      <div className="content">
      
        <Row>
            <Card className="card-chart">
            <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h4 >Viewing Room {props.match.params.id} For  {moment(`${month}/${day}/${year}`).format("LL")} </h4>
                    
                    <TheDateBox id= {props.match.params.id} date = {props.match.params.date}/>
                    
  
                    <CardTitle tag="h2">Decibel Reading </CardTitle>
                  </Col>
                  </Row>
                  
              </CardHeader>
             
                
                  {/* Main graph */}
                  <ScrollLineGraph />
                
             
            </Card>
      
            <Card className="card-chart">
              <CardHeader>
              <CardTitle tag="h3"> Room Data Over 24 Hours  </CardTitle>
                
              </CardHeader>

              <div>
                <Row>
                <div className="thePieChart" style={{display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center'}} >
                <MyPieChart/>
                </div>
                <div style={{display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center'}} >
                  
                  <AvgGauge/>
                </div>
                
                <div style={{display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center'}}  >
                <MaxGuage/>
                 
                 
                  
                </div>
                
                <div>
              </div>
                
                
                
              </Row>
              
              </div>
                
                
              
            </Card>
          
        </Row>
        <Row>

        <Card className="card-chart"  style={ theme==='white-content'? {  backgroundColor:'white'}:{backgroundColor:'#817F99'}}>
            <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    
                    
                    
  
                    <CardTitle tag="h3" style={{color:''}}>Averages & Max Decibels Readings For Every Hour </CardTitle>
                  </Col>
                  </Row>
                  
              </CardHeader>
             
                
                  {/* Main graph */}
                 
                  <VerticalBulletChart/>
             
            </Card>
            <Card className="card-chart">
            <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
  
                    <CardTitle tag="h2">Pitch Reading </CardTitle>
                  </Col>
                  </Row>
                  
              </CardHeader>
             
                
                  {/* Main graph */}
                  <PitchGraph />
                
             
            </Card>
        </Row>
        
      </div>
    </>
  
  );
  }
  }


export default Dashboard;