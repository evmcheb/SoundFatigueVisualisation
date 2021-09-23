// Main Page displaying the cards of all rooms iwth their average data
///
import React from 'react'
import { render } from 'react-dom';
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
import AvgGauge from '../variables/AvgGauge';



function MainPage() {
    
    return (
        
        <>
        <FetchDataTwo/>
        <div className="content">
            
            <div>
            <Row>
            <Col lg="4">


                
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room 1</h3>
                    
                    <CardTitle tag="h3">
                        {/* LINK TO room visualisation here */}
                       <a href ={'/Dashboard'} > Link</a>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    
                    {/*  DISPLAY GAUGE HERE */}
                    <AvgGauge/>
                    
                </CardBody>
                </Card>

                
                
            </Col>
            <Col lg="4">


                
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room 2</h3>
                    <CardTitle tag="h3">
                        {/* LINK TO room visualisation here */}
                    <i > LINK</i>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                    {/*  DISPLAY GAUGE HERE */}
                    </div>
                </CardBody>
                </Card>


                
            </Col>
            <Col lg="4">


                
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room 3</h3>
                    <CardTitle tag="h3">
                        {/* LINK TO room visualisation here */}
                    <i > LINK</i>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                    {/*  DISPLAY GAUGE HERE */}
                    </div>
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
                    <i > LINK</i>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                    {/*  DISPLAY GAUGE HERE */}
                    </div>
                </CardBody>
                </Card>


                
            </Col>
            <Col lg="4">


                
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room 5</h3>
                    <CardTitle tag="h3">
                        {/* LINK TO room visualisation here */}
                    <i > LINK</i>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                    {/*  DISPLAY GAUGE HERE */}
                    </div>
                </CardBody>
                </Card>


                
            </Col>
            <Col lg="4">


                
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room 6</h3>
                    <CardTitle tag="h3">
                        {/* LINK TO room visualisation here */}
                    <i > LINK</i>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                    {/*  DISPLAY GAUGE HERE */}
                    </div>
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
                    <h3 >Room 7</h3>
                    <CardTitle tag="h3">
                        {/* LINK TO room visualisation here */}
                    <i > LINK</i>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                    {/*  DISPLAY GAUGE HERE */}
                    </div>
                </CardBody>
                </Card>


                
            </Col>
            <Col lg="4">


                
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room 8</h3>
                    <CardTitle tag="h3">
                        {/* LINK TO room visualisation here */}
                    <i > LINK</i>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                    {/*  DISPLAY GAUGE HERE */}
                    </div>
                </CardBody>
                </Card>


                
            </Col>
            <Col lg="4">


                
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room 9</h3>
                    <CardTitle tag="h3">
                        {/* LINK TO room visualisation here */}
                    <i > LINK</i>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                    {/*  DISPLAY GAUGE HERE */}
                    </div>
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
                    <h3 >Room 10</h3>
                    <CardTitle tag="h3">
                        {/* LINK TO room visualisation here */}
                    <i > LINK</i>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                    {/*  DISPLAY GAUGE HERE */}
                    </div>
                </CardBody>
                </Card>


                
            </Col>
            <Col lg="4">


                
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room 11</h3>
                    <CardTitle tag="h3">
                        {/* LINK TO room visualisation here */}
                    <i > LINK</i>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                    {/*  DISPLAY GAUGE HERE */}
                    </div>
                </CardBody>
                </Card>


                
            </Col>
            <Col lg="4">


                
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room 12</h3>
                    <CardTitle tag="h3">
                        {/* LINK TO room visualisation here */}
                    <i > LINK</i>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                    {/*  DISPLAY GAUGE HERE */}
                    </div>
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
