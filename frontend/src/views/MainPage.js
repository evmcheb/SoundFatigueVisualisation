// Main Page displaying the cards of all rooms iwth their average data
///
import React from 'react'
import { render } from 'react-dom';
import {Link } from "react-router-dom";
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

import FetchDataTwo, { loading } from '../FetchData/FetchDataTwo';
import FetchDataAVG from '../FetchData/FetchDataAVG';
import AvgGauge from '../variables/AvgGauge';



function MainPage() {
   
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = dd + '-' + mm + '-' + yyyy;
       
      
    return (
        
        <>
       
        <div className="content">
        
            <div>
            <Row>
            <Col lg="4">


                
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room 1</h3>
                    
                    <CardTitle tag="h3">
                        {/* LINK TO room visualisation here */}
                        <FetchDataAVG date = {today}/>

                        <div style={{display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center'}} >
                            <AvgGauge room={1}/>
                        </div>
                        
                        <Link to= {"1~" + today}><button>
                            Go to Room 1 
                            </button>
                        </Link>
                       
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    
                    {/*  DISPLAY Average or something here */}
                    
                    
                </CardBody>
                </Card>

                
                
            </Col>
            <Col lg="4">


                
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room 2</h3>
                    <CardTitle tag="h3">
                        {/* LINK TO room visualisation here */}
                        <FetchDataAVG room={2} date = {today}/>

                        <div style={{display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center'}} >
                            <AvgGauge room={2}/>
                        </div>

                        <Link to= {"2~" + today}><button>
                            Go to Room 2
                            </button>
                            </Link>
                       
                    </CardTitle>
                </CardHeader>
                <CardBody>
                   
                    {/*  DISPLAY GAUGE HERE */}
                    
                </CardBody>
                </Card>


                
            </Col>
            <Col lg="4">


                
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room 3</h3>
                    <CardTitle tag="h3">
                        {/* LINK TO room visualisation here */}
                        <FetchDataAVG room={3} date = {today}/>

                        <div style={{display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center'}} >
                            <AvgGauge room={3}/>
                        </div>
                        <Link to= {"3~" + today}><button>
                            Go to Room 3
                            </button>
                            </Link>
                       
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    
                    {/*  DISPLAY GAUGE HERE */}
                  
                </CardBody>
                </Card>


                
            </Col>
            </Row>
            </div>
            <div>
            <Row>
            <Col lg="4">


                
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room 4</h3>
                    <CardTitle tag="h3">
                        {/* LINK TO room visualisation here */}
                        <FetchDataAVG date = {today}/>

                        <div style={{display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center'}} >
                            <AvgGauge room={4}/>
                        </div>
                        <Link to= {"4~" + today}><button>
                            Go to Room 4
                            </button>
                            </Link>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                   
                    {/*  DISPLAY GAUGE HERE */}
                  
                </CardBody>
                </Card>


                
            </Col>
            <Col lg="4">


                
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room 5</h3>
                    <CardTitle tag="h3">
                        <FetchDataAVG date = {today}/>

                        <div style={{display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center'}} >
                            <AvgGauge room={5}/>
                        </div>
                        {/* LINK TO room visualisation here */}
                        <Link to= {"5~" + today}><button>
                            Go to Room 5
                            </button>
                            </Link>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    
                    {/*  DISPLAY GAUGE HERE */}
                  
                </CardBody>
                </Card>


                
            </Col>
            <Col lg="4">


                
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room 6</h3>
                    <CardTitle tag="h3">
                        <FetchDataAVG date = {today}/>

                        <div style={{display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center'}} >
                            <AvgGauge room={6}/>
                        </div>
                        {/* LINK TO room visualisation here */}
                        <Link to= {"6~" + today}><button>
                            Go to Room 6
                            </button>
                            </Link>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    
                    {/*  DISPLAY GAUGE HERE */}
                  
                </CardBody>
                </Card>


                
            </Col>
            </Row>
            </div>
           
            
            
        </div>
        </>
    )
}

export default MainPage