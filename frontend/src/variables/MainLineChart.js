import React, { PureComponent } from 'react';
import FetchData from '../FetchData/FetchData';
import FetchDataTwo from "../FetchData/FetchDataTwo";
import FetchDataTime from "../FetchData/FetchDataTime";


import { render } from "react-dom";

import { LineChart, Line, XAxis, YAxis, ReferenceLine } from "recharts";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const data = [];
const launchDate = 2004;

const rand = 300;
for (let i = 0; i < 7; i++) {
  const year = 2000 + i;
  const value = Math.random() * (rand + 50) + 100;
  let d = {
    year: year,
    value: value,
    beforeLaunch: year <= launchDate ? value : undefined
  };

  data.push(d);
}

// change type to see that the overlap might not be appropriate towards the
// end of the shorter chart
const type = "monotone";

const MainLineChart = () => (
  <div style={styles}>
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type={type} dataKey="value" stroke="#8884d8" dot={false} />
      <XAxis dataKey="year" />
      <YAxis />
      <ReferenceLine x={launchDate} label="iPhone" />
    </LineChart>
  </div>
);

export default MainLineChart
