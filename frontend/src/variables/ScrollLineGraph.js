import React from 'react';
//import { zoomingData } from './data.js';
import FetchDataTwo, { zoomingData,lastTime,startTime, avgDecibel,averageDecibelColour,done} from "../FetchData/FetchDataTwo";
////////////////////////////////////////././/////////////
import Button from 'react-bootstrap/Button'
import Chart, {
  ArgumentAxis,
  Series,
  ZoomAndPan,
  Legend,
  ScrollBar,
  Crosshair,
  Label,
  ConstantLine,
  ValueAxis,
  Scale
} from 'devextreme-react/chart';

///
//if i want to shorten the defualt range
//defaultVisualRange={{ startValue: startTime, endValue: lastTime }}>
class ScrollLineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: {zoomingData},
          render:false
        };
        this.handleChange = this.handleChange.bind(this);
        
      }
//
      componentDidMount(){
        
          setTimeout(function(){
              this.setState({render:true})
          }.bind(this),500)
          
          
          
      }
     

      

      render(){
        console.log("hi",this.state.data.zoomingData)
        let renderContainer = false
        if(this.state.render) {
            console.log({done})
            if(done==1 && this.state.data.zoomingData==0){
                console.log("cunt")
                this.setState({data: {zoomingData}});
                 
            }
            if(done==-1){
                this.componentDidMount();
            }
        return (
        
        <>
        
        
      <Chart
        
        id="chart"
        palette="Material"
        dataSource= {this.state.data.zoomingData}
        >
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
      
    <div>
    <Button onClick={this.handleChange}>
    </Button>

        {lastTime}
        
    </div>
    
    </>
    
    );
    }
   
     
    return (
        renderContainer //Render the dom elements, or, when this.state == false, nothing.
        
      )
  
}
    handleChange(e) {
        this.setState({data: {zoomingData}});
        console.log("yo",this.state.data)
        
      }
      
  }


export default ScrollLineGraph;
////