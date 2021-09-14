import React from 'react';
//import { zoomingData } from './data.js';
import { zoomingData,lastTime,startTime, avgDecibel,averageDecibelColour} from "../FetchData/FetchDataTwo";
////////////////////////////////////////././//////////

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

//if i want to shorten the defualt range
//defaultVisualRange={{ startValue: startTime, endValue: lastTime }}>
class ScrollLineGraph extends React.Component {
    
    
  render() {
    return (
      <Chart
        id="chart"
        palette="Material"
        dataSource={zoomingData}>
        <Series argumentField="arg" valueField="y1" />
        
        <ArgumentAxis  >

        </ArgumentAxis>
        {/* Setting the green to red horizontal lines */}
        <ValueAxis>
        <ConstantLine value={10} color="green" dashStyle="longDash">

        </ConstantLine>
        <ConstantLine value={20} color="green" dashStyle="longDash">
        <Label visible={false} />
        </ConstantLine>
        <ConstantLine value={30} color="green" dashStyle="longDash">
        <Label visible={false} />
        </ConstantLine>
        <ConstantLine value={40} color="green" dashStyle="longDash">
        <Label visible={false} />
        </ConstantLine>
        <ConstantLine value={50} color="green" dashStyle="longDash">
        <Label visible={false} />
        </ConstantLine>
        <ConstantLine value={60} color="green" dashStyle="longDash">
        <Label visible={false} />
        </ConstantLine>
        <ConstantLine value={70} color="#D4FF00" dashStyle="longDash">
        <Label visible={false} />
        </ConstantLine>
        <ConstantLine value={80} color="#FFFF00 " dashStyle="longDash">
            <Label visible={false} />
        </ConstantLine>
        <ConstantLine value={90} color="#FFD919 " dashStyle="longDash">
            <Label visible={false} />
        </ConstantLine>
        <ConstantLine value={94} color="#FFB319 " dashStyle="longDash">
            <Label visible={false} />
        </ConstantLine>
        <ConstantLine value={100} color="#FF8C19 " dashStyle="longDash">
        <Label visible={false} />
        </ConstantLine>
        <ConstantLine value={106} color="#FF6619 " dashStyle="longDash">
            <Label visible={false} />
        </ConstantLine>
        <ConstantLine value={112} color="#FF4019 " dashStyle="longDash">
            <Label visible={false} />
        </ConstantLine>
        <ConstantLine value={120} color="#FF1919 " dashStyle="longDash">
            <Label visible={false} />
        </ConstantLine>
        <ConstantLine value={130} color="#FF0000 " dashStyle="longDash">
            <Label visible={false} />
        </ConstantLine>
        <ConstantLine value={140} color="#CC0000 " dashStyle="longDash" >
            <Label visible={false} />
        </ConstantLine>
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