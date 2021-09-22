// Main Page displaying the cards of all rooms iwth their average data

import React from 'react'
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



function MainPage() {
    return (
        <>
        <div className="content">
            
            <div>
            <Col lg="4">
            <Row>


                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room1</h3>
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
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room1</h3>
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
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room1</h3>
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
                <Card className="card-chart">
                <CardHeader>
                    <h3 >Room1</h3>
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


                </Row>
            </Col>
            </div>
            
        </div>
        </>
    )
}

export default MainPage
