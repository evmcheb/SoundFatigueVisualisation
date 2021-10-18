import React from 'react';

import  { pitchData, done} from "../FetchData/FetchRoomData";


import Chart, {
  ArgumentAxis,
  Series,
  ZoomAndPan,
  Legend,
  ScrollBar,
  Crosshair,
  Label,
  ValueAxis,
  LoadingIndicator,
  Aggregation,
  Point,
} from 'devextreme-react/chart';

//if i want to shorten the defualt range
//defaultVisualRange={{ startValue: startTime, endValue: lastTime }}>
class PitchGraph extends React.Component {

    
   
    constructor(props) {
        super(props);
        this.state = {
          data: {pitchData},
          render:false
        };
       
       
      }

      componentDidMount(){
        
          setTimeout(function(){
              this.setState({render:true})
          }.bind(this),1500)
          
          this.interval = setInterval(() => this.setState({ data: {pitchData}}), 16500);
          
      }
     

      render(){

        let renderContainer = false
        if(this.state.render) {
            if(done===1 && this.state.data.pitchData===0){
               
                this.setState({data: {pitchData}});
                 
            }
            if(done===-1){
                this.componentDidMount();
            }
        return (
        
        <>
        
    
      
        
   
      <Chart
        
        id="chart"
        palette="Material"
        dataSource= {this.state.data.pitchData}
        
        
        >
        <Series  valueField="y1"  type="line" >
            <Aggregation enabled={true} />
            <Point visible={false}></Point>
        </Series>
        
        <ArgumentAxis
            
            argumentType="datetime"
           />
            <Label format="shortTime" />
       
        {/* Setting the green to red horizontal lines */}
        <ValueAxis>
        <LoadingIndicator enabled={true} />

        </ValueAxis>
        <ScrollBar visible={true} />
        <ZoomAndPan argumentAxis="both"  />
        <Crosshair
            
            enabled={false}>
            <Label visible={false} />
          </Crosshair>
          <Legend visible={false} />
         
      </Chart>
      
   
    </>
    
    );
    }
   
     
    return (
        renderContainer //Render the dom elements, or, when this.state == false, nothing.
        
      )
  
}
    
      
  }


export default PitchGraph;
////