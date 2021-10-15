import React from 'react';

import  { workerData, avgDecibel,averageDecibelColour,done,currentRoom} from "../FetchData/FetchWorkerData";

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
  LoadingIndicator,
  Aggregation,
  Point,
} from 'devextreme-react/chart';

//if i want to shorten the defualt range
//defaultVisualRange={{ startValue: startTime, endValue: lastTime }}>
class WorkerGraph extends React.Component {

    
   
    constructor(props) {
        super(props);
        this.state = {
          data: {workerData,currentRoom},
          render:false
        };
       
        
      }

      componentDidMount(){
        
          setTimeout(function(){
              this.setState({render:true})
          }.bind(this),1500)
          
          this.interval = setInterval(() => this.setState({ time: Date.now(),data: {workerData,currentRoom}}), 3000);
          
      }
     

      render(){
        

        let renderContainer = false
        if(this.state.render) {
            
            if(done===1 && this.state.data.workerData===0){
                
                this.setState({data: {workerData,currentRoom}});
                 
            }
            if(done===-1){
                this.componentDidMount();
            }
        return (
        
        <>
        
    
      
        
   
      <Chart
        
        id="chart"
        palette="Material"
        dataSource= {this.state.data.workerData}
        
        
        >
        <Series  valueField="y1"  type="line" >
            <Aggregation enabled={true} />
            <Point visible={false}></Point>
        </Series>
        
        <ArgumentAxis
            
            argumentType="datetime"
           >
       
           </ArgumentAxis>
            <Label format="shortTime" />
       
        {/* Setting the green to red horizontal lines */}
        <ValueAxis>
        <LoadingIndicator enabled={true} />
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
            
            enabled={false}>
            <Label visible={false} />
          </Crosshair>
          <Legend visible={false} />
      </Chart>
      
      <div>
      <h4> Worker is Currently in Room: {this.state.data.currentRoom} </h4>
      </div>
    </>
    
    );
    }
   
     
    return (
        renderContainer //Render the dom elements, or, when this.state == false, nothing.
        
      )
  
}
    
      
  }


export default WorkerGraph;
////