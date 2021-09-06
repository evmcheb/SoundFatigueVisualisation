import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
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

import {
    chartExample4,
} from "variables/charts.js";


const RoomCharts = () => {
    const [bigChartData, setbigChartData] = useState("data1");
    const [fetchedData, setFetchedData] = useState({});

    const url = `http://127.0.0.1:8000/room/1`

    const fetchData = async (url) => {
        console.log("Fetching data")
        return new Promise((res, rej) => {
            axios.get(url)
                .then((resp) => {
                    res(resp.data[0]);
                })
                .catch(err => rej(err))
        });
    }

    useEffect(async () => {
        let isMounted = true;
        const fetchedData = await fetchData(url);
        if (isMounted) {
            setFetchedData(fetchedData);
        }
        return () => isMounted = false;
    }, []);

    const fetchNewData = () => {
        fetchData(url).then((res) => {
            setFetchedData(res)
        })
    }

    function timestampToHMS(timestamp) {
        var date = new Date(timestamp);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        //var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        var formattedTime = timestamp;
        return formattedTime
    }

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
                        callback: (val) => timestampToHMS(val),
                        padding: 20,
                        fontColor: "#9a9a9a",

                    },
                },
            ],
        },
    };

    /* Setting the the data fetched to chart 1*/
let chartExample1 = {
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
                        label: "Sound Level for Room A",
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




    function soundsAvg(sound, xlabels, periods) {
        var averages = [], labels = [];

        var i, j, temporary, chunk = 10;
        for (i = 0, j = 37; i < j; i += chunk) {
            temporary = sound.slice(i, i + chunk);
            labels.push(sound.slice(i, i + chunk));
            averages.push(temporary.reduce((a, b) => (a + b)) / 4);
        }

        console.log(averages);
        console.log(labels);

    };

    // soundsAvg(fetchedData.dB, fetchedData.x, 9);

    let chartExample2 = {
        data: (canvas) => {
            let ctx = canvas.getContext("2d");

            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

            gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
            gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

            return {
                labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
                datasets: [
                    {
                        label: "Data",
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
                        data: [80, 100, 70, 80, 120, 80],
                    },
                ],
            };
        },
        options: chart1_2_options,
    };

    var min = Math.min.apply(Math, fetchedData.dB),
        max = Math.max.apply(Math, fetchedData.dB)

    let chartExample3 = {
        data: (canvas) => {
            let ctx = canvas.getContext("2d");

            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

            gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
            gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
            gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

            return {
                labels: ["Min", "Max"],
                datasets: [
                    {
                        label: "Minimum and Maximum dB",
                        fill: true,
                        backgroundColor: gradientStroke,
                        hoverBackgroundColor: gradientStroke,
                        borderColor: "#d048b6",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        data: [min, max],
                    },
                ],
            };
        },
        options: {
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
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(225,78,202,0.1)",
                            zeroLineColor: "transparent",
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "#9e9e9e",
                        },
                    },
                ],
                xAxes: [
                    {
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(225,78,202,0.1)",
                            zeroLineColor: "transparent",
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "#9e9e9e",
                        },
                    },
                ],
            },
        },
    };

    





module.exports = {
    chartExample1, // in src/views/Dashboard.js
    chartExample2, // in src/views/Dashboard.js
    chartExample3, // in src/views/Dashboard.js
    chartExample4, // in src/views/Dashboard.js
  }
};