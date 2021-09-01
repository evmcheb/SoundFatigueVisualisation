import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import classNames from "classnames";
import axios from "axios";

import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

function RoomCharts() {
    const [fetchedData, setFetchedData] = useState({});
    const [bigChartData, setbigChartData] = React.useState("data1");
    const setBgChartData = (name) => {
        setbigChartData(name);
    };
    /* fetching data from the api for room/1*/
    const url = `http://127.0.0.1:8000/room/1`

    useEffect(() => {
        axios.get(`${url}`)

            .then((response) => {
                setFetchedData(response.data[0]);
            })
            .catch(error => console.error(`Error: ${error}`));
        console.log(fetchedData);
    }, [url]);

    /* setting the options for the chart*/
    let chart1_2_options = {
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        tooltips: {
            backgroundColor: "#f5f5f5",
            titleFontColor: "#333",
            bodyFontColor: "#666",
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
        },
        responsive: true,
        scales: {
            yAxes: [
                {
                    barPercentage: 1.6,
                    gridLines: {
                        drawBorder: false,
                        color: "rgba(29,140,248,0.0)",
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        padding: 20,
                        fontColor: "#9a9a9a",
                    },
                },
            ],
            xAxes: [
                {
                    barPercentage: 1.6,
                    gridLines: {
                        drawBorder: false,
                        color: "rgba(29,140,248,0.1)",
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        padding: 20,
                        fontColor: "#9a9a9a",
                    },
                },
            ],
        },
    };

    /* Setting the the data fetched to chart 1*/
    const chartExample1 = {
        data1: (canvas) => {
            let ctx = canvas.getContext("2d");

            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

            gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
            gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors 
            return {
                labels: fetchedData.x,
                datasets: [
                    {
                        label: "Sound Level for Room A on 2015-12-31",
                        fill: true,
                        backgroundColor: gradientStroke,
                        borderColor: "#1f8ef1",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#1f8ef1",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#1f8ef1",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 2,
                        data: fetchedData.dB,
                    },
                ],
            };
        },
        data2: (canvas) => {
            let ctx = canvas.getContext("2d");

            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

            gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
            gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

            return {
                labels: fetchedData.x,
                datasets: [
                    {
                        label: "My First dataset",
                        fill: true,
                        backgroundColor: gradientStroke,
                        borderColor: "#1f8ef1",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#1f8ef1",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#1f8ef1",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: fetchedData.pitch,
                    },
                ],
            };
        },
        data3: (canvas) => {
            let ctx = canvas.getContext("2d");

            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

            gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
            gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

            return {
                labels: [
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN",
                    "JUL",
                    "AUG",
                    "SEP",
                    "OCT",
                    "NOV",
                    "DEC",
                ],
                datasets: [
                    {
                        label: "My First dataset",
                        fill: true,
                        backgroundColor: gradientStroke,
                        borderColor: "#1f8ef1",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#1f8ef1",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#1f8ef1",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
                    },
                ],
            };
        },
        options: chart1_2_options,
    };

    return (
        <Col xs="12">
            <Card className="card-chart">
                <CardHeader>
                    <Row>
                        <Col className="text-left" sm="6">
                            <h5 className="card-category">Decibels</h5>
                            <CardTitle tag="h2">Room A 31st December 2015</CardTitle>
                        </Col>
                        <Col sm="6">
                            <ButtonGroup
                                className="btn-group-toggle float-right"
                                data-toggle="buttons"
                            >
                                <Button
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: bigChartData === "data1",
                                    })}
                                    color="info"
                                    id="0"
                                    size="sm"
                                    onClick={() => setBgChartData("data1")}
                                >
                                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                        Decibels
                                    </span>
                                    <span className="d-block d-sm-none">
                                        <i className="tim-icons icon-single-02" />
                                    </span>
                                </Button>
                                <Button
                                    color="info"
                                    id="1"
                                    size="sm"
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: bigChartData === "data2",
                                    })}
                                    onClick={() => setBgChartData("data2")}
                                >
                                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                        Pitch
                                    </span>
                                    <span className="d-block d-sm-none">
                                        <i className="tim-icons icon-gift-2" />
                                    </span>
                                </Button>
                                <Button
                                    color="info"
                                    id="2"
                                    size="sm"
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: bigChartData === "data3",
                                    })}
                                    onClick={() => setBgChartData("data3")}
                                >
                                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                        Decibels & Pitch
                                    </span>
                                    <span className="d-block d-sm-none">
                                        <i className="tim-icons icon-tap-02" />
                                    </span>
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                        <Line
                            data={chartExample1[bigChartData]}
                            options={chartExample1.options}
                        />
                    </div>
                </CardBody>
            </Card>
        </Col>
    )

}

export default RoomCharts;


