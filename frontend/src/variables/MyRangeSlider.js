import React from 'react';
import { zoomingData,lastTime,startTime, avgDecibel,averageDecibelColour,done} from "../FetchData/FetchDataTwo";
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
import TheTimePicker from './TheTimePicker.js';

class MyRangeSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {zoomingData},
      render:false,
      startValue: 0,
      endValue: 0,
      visualRange: {},
    };

    this.updateVisualRange = this.updateVisualRange.bind(this);

  }


  componentDidMount(){
    
      setTimeout(function(){
          this.setState({render:true})
      }.bind(this),500)
  }

     

render(){
  
  let renderContainer = false
  if(this.state.render) {
     
      if(done==1 && this.state.data.zoomingData==0){
          
          this.setState({data: {zoomingData}});
           
      }
      if(done==-1){
          this.componentDidMount();
      }
  return (
    
    <>
      <div id="chart-demo">
           <TheTimePicker/>
           <div className="dx-field">
            <div className="dx-field-label" style={{ color: 'gray' }}>Start value</div>
            <div className="dx-field-value">
              <NumberBox value={this.state.startValue} showSpinButtons={true} showClearButton={true} onValueChanged={this.updateVisualRange} />
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label" style={{ color: 'gray' }}>End value</div>
            <div className="dx-field-value">
              <NumberBox value={this.state.endValue}  showSpinButtons={true} onValueChanged={this.updateVisualRange} />
            </div>
          </div>
          <RangeSelector
          dataSource={this.state.data.zoomingData}
          
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
        dataSource={this.state.data.zoomingData}>
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
        </>
      );
    }
   
     
    return (
        renderContainer //Render the dom elements, or, when this.state == false, nothing.
        
      )
  
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