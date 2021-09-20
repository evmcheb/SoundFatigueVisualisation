import React from 'react';
import { dataSource } from './data.js';
import { zoomingData,lastTime,startTime, avgDecibel,averageDecibelColour} from "../FetchData/FetchDataTwo";
import {NumberBox} from 'devextreme-react/number-box';
import Chart, {
  Series,
  Aggregation,
  ArgumentAxis,
  Grid,
  Label,
  ValueAxis,
  Margin,
  Legend,
  Tooltip,
  ScrollBar,
  ZoomAndPan,
  Crosshair,
 
} from 'devextreme-react/chart';

import RangeSelector, {
  Size,
  Scale,
  Chart as RsChart,
  ValueAxis as RsValueAxis,
  Series as RsSeries,
  Aggregation as RsAggregation,
  Behavior
} from 'devextreme-react/range-selector';

class MyRangeSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
      startValue: 0,
      endValue: 0,
      visualRange: {},
    };

    this.updateVisualRange = this.updateVisualRange.bind(this);

  }

  render() {
    return (
      <div id="chart-demo">
           <div className="dx-field">
            <div className="dx-field-label">Start value</div>
            <div className="dx-field-value">
              <NumberBox value={this.state.startValue} showSpinButtons={true} showClearButton={true} onValueChanged={this.updateVisualRange} />
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">End value</div>
            <div className="dx-field-value">
              <NumberBox value={this.state.endValue}  showSpinButtons={true} onValueChanged={this.updateVisualRange} />
            </div>
          </div>
          <RangeSelector
          dataSource={zoomingData}
          
          start={this.updateVisualRange}
          end={this.updateVisualRange}
          onValueChanged={this.updateVisualRange}
        >
          <Size height={100} />
          <RsChart>
            <RsValueAxis valueType="numeric" />
            <RsSeries
              type="line"
              valueField="y1"
              argumentField="arg"
            >
              <RsAggregation enabled="true" />
            </RsSeries>
          </RsChart>
          <Scale
            placeholderHeight={20}
            
            
            valueType="numeric"
            
          />
          <Behavior
            snapToTicks={false}
            callValueChanged="onMoving"
          />
        </RangeSelector>

        


       
        




        <Chart
        id="chart"
        palette="Material"
        dataSource={zoomingData}>
        <Series argumentField="arg" valueField="y1" >
            <Aggregation enabled={true} />
        </Series>
        
        <ArgumentAxis
            visualRange={this.state.visualRange}
            valueMarginsEnabled={false}
            
          ></ArgumentAxis>
        
        {/* Setting the green to red horizontal lines */}
        <ValueAxis valueType="numeric" >
        
        </ValueAxis>
        
        
        <Crosshair
            enabled={true}>
            <Label visible={true} />
          </Crosshair>
        <Legend visible={false} />
      </Chart>
      </div>
    );
  }

  updateVisualRange(e) {
    
    this.setState({ 
        startValue:Math.ceil(e.value[0]),
        endValue:Math.ceil(e.value[1]),
        visualRange: e.value
    
    });
  }
  
  

}

export default MyRangeSlider;