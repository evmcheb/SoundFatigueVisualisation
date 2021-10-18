import React, { useContext } from 'react';
// nodejs library that concatenates classes

import moment from "moment";
import WorkerGraph from "variables/WorkerGraph"
// reactstrap components
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import FetchWorkerData from "../FetchData/FetchWorkerData";


import WorkerPieChart from "../variables/WorkerPieChart";

import "../assets/css/myDashboard.css"

import AccordionWorkerDash from "../variables/AccordionWorkerDash";
import TheDateBox from "../variables/TheDateBox";
import MaxWorkerGuage from "../variables/MaxWorkerGuage";
import { Dropdown } from 'react-bootstrap';
import AverageWorkGauge from "variables/AverageWorkGuage";
import VerticalBulletWorker from "variables/VerticalBulletWorker";
import { Link } from "react-router-dom";
import { ThemeContext } from "contexts/ThemeContext";

function WorkerDashboard(props) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '-' + mm + '-' + yyyy;
  const { theme } = useContext(ThemeContext);




  var dateToDisplay = props.match.params.date

  var [day, month, year] = dateToDisplay.split('-')
  //If sidebar link was clicked and no room is selected
  //make user select room to display
  if (props.match.params.date.endsWith('date') || props.match.params.id.endsWith('workerid')) {
    return (
      <>
        <div className="content">
          <Dropdown >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Display Worker:
              <i className="tim-icons icon-minimal-down" data-notify="icon" style={{ padding: "15px" }} />
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ overflowY: "scroll", height: "200px", width: "30%", display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              <Link to={"1~" + today} style={{ color: 'black', fontSize: '17px' }}>Caleb</Link>
              <Link to={"2~" + today} style={{ color: 'black', fontSize: '17px' }}>Darby</Link>
              <Link to={"3~" + today} style={{ color: 'black', fontSize: '17px' }}>Aditi</Link>
              <Link to={"4~" + today} style={{ color: 'black', fontSize: '17px' }}>Shane</Link>
              <Link to={"5~" + today} style={{ color: 'black', fontSize: '17px' }}>Kese</Link>
            </Dropdown.Menu>
          </Dropdown>

        </div>
      </>)
  }
  else {
    return (

      <>

        <div>
          {/* pass in what room was clicked?*/}
          
          <FetchWorkerData id={props.match.params.id} date={props.match.params.date} />

        </div>

        <div className="content">

          <Row>

            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h4 >Viewing WorkerID {props.match.params.id} For  {moment(`${month}/${day}/${year}`).format("LL")} </h4>

                    <TheDateBox id={props.match.params.id} date={props.match.params.date} />


                    <CardTitle tag="h2">Decibel Reading </CardTitle>
                  </Col>
                </Row>

              </CardHeader>


              {/* Main graph */}
              <WorkerGraph />


            </Card>

            
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3"> Worker Data Over 24 Hours  </CardTitle>

                </CardHeader>

                <div>
                  <Row>
                    <div className="thePieChart" style={{ padding: "25px" }}>
                      <WorkerPieChart />

                    </div>
                    <div>

                      <AverageWorkGauge />
                    </div>

                    <div  >
                      <MaxWorkerGuage />




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




                    <CardTitle tag="h3" style={ theme==='white-content'? { color:'black'}:{color:'white'}} >Averages & Max Decibels Readings For Every Hour </CardTitle>
                  </Col>
                </Row>

              </CardHeader>



              <VerticalBulletWorker />

            </Card>
          </Row>
          <Row>

            <Card className="card-chart">

              <AccordionWorkerDash />






            </Card>
          </Row>

        </div>
      </>

    );
  }
}


export default WorkerDashboard;