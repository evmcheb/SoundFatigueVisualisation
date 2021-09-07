import React from 'react';
//import { zoomingData } from './data.js';
import { zoomingData,lastTime,startTime, avgDecibel,averageDecibelColour} from "../FetchData/FetchDataTwo";
////////////////////////////////////////././///

import Chart, {
  ArgumentAxis,
  Series,
  ZoomAndPan,
  Legend,
  ScrollBar,
  Crosshair,
  Label,
  ConstantLine,
  ValueAxis
} from 'devextreme-react/chart';

//
class ScrollLineGraph extends React.Component {


  render() {
    return (
      <Chart
        id="chart"
        palette="Material"
        dataSource={zoomingData}>
        <Series argumentField="arg" valueField="y1" />
        
        <ArgumentAxis  defaultVisualRange={{ startValue: startTime, endValue: lastTime }}>

         
        </ArgumentAxis>
        <ValueAxis>
        <ConstantLine value={0} color="green" dashStyle="longDash"/>
        <ConstantLine value={40} color="green" dashStyle="longDash"/>
        <ConstantLine value={70} color="yellow" dashStyle="longDash"/>
        <ConstantLine value={80} color="#ff726f " dashStyle="longDash"/>
        <ConstantLine value={110} color="red " dashStyle="longDash"/>
        <ConstantLine value={avgDecibel}  width={4} color={averageDecibelColour} dashStyle="solid" >
            <Label text= "Average" weight = {400} />
        </ConstantLine>
        </ValueAxis>
        <ScrollBar visible={true} />
        <ZoomAndPan argumentAxis="both" />
        <Crosshair
            enabled={true}>
            <Label visible={true} />
          </Crosshair>
        <Legend visible={false} />
      </Chart>
    );
  }
}

export default ScrollLineGraph;
////