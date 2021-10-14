import React from 'react';
import { CircularGauge, Scale, Label, RangeContainer, Range, Title, Font, Export ,Tooltip} from 'devextreme-react/circular-gauge';

import {totalDosage,done} from "../FetchData/FetchWorkerData";
class TotalDosageGuage extends React.Component {

  
   
    constructor(props) {
        super(props);
        this.state = {
          data: {totalDosage},
          render:false
        };
        
        
      }

      componentDidMount(){
        
          setTimeout(function(){
              this.setState({render:true})
          }.bind(this),15000)
          
          this.interval = setInterval(() => this.setState({data: {totalDosage}}), 15000);
      }
     

      render(){
        
        let renderContainer = false;
     
        if(this.state.render) {
            console.log({done})
            if(done==1 && this.state.data.totalDosage==0){
                
                this.setState({data: {totalDosage}});
                console.log(this.state.data)
            }
            if(done==-1){
                this.componentDidMount();
            }

    return (
      <>
        
      <CircularGauge
        id="gauge"
        value={this.state.data.totalDosage}
        
      >
        <Scale startValue={0} endValue={100} tickInterval={10}>
          <Label useRangeColors={true} />
        </Scale>
        <RangeContainer palette="bright">
          <Range startValue={0} endValue={70} />
          <Range startValue={70} endValue={91} />
          <Range startValue={91} endValue={112} />
          <Range startValue={112} endValue={160} />
        </RangeContainer>
        <Tooltip enabled={true} />
       
        <Title text="Max Decibels in Room" >
          <Font size={28} color="white" />
        </Title>
        
        <Export enabled={false} />
      </CircularGauge>
      </>
    );
}

 
return (
    renderContainer //Render the dom elements, or, when this.state == false, nothing.
    
  )

}

  
}

export default TotalDosageGuage;