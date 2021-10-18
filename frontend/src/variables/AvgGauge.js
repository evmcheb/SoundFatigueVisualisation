import React from 'react';
import { CircularGauge, Scale, Label, RangeContainer, Range, Title, Font, Export ,Tooltip} from 'devextreme-react/circular-gauge';
import { avgDecibel,maxDecibel,done} from "../FetchData/FetchRoomData";

class AvgGauge extends React.Component {

  
   
    constructor(props) {
        super(props);
        this.state = {
          data: {avgDecibel},
          render:false
        };
        
        
      }

      componentDidMount(){
        
          setTimeout(function(){
              this.setState({render:true})
          }.bind(this),600)
          
          this.interval = setInterval(() => this.setState({ time: Date.now(),data: {avgDecibel}}), 16200);

          
      }
     

      render(){
        
        let renderContainer = false
        if(this.state.render) {
            
            if(done===1 && this.state.data.avgDecibel===0){
                
                this.setState({data: {avgDecibel}});
                 
            }
            if(done===-1){
                this.componentDidMount();
            }

    return (
        
      <CircularGauge
        id="gauge"
        value={this.state.data.avgDecibel}
        
      >
        <Scale startValue={0} endValue={maxDecibel} tickInterval={10}>
          <Label useRangeColors={true} />
        </Scale>
        <RangeContainer palette="bright">
          <Range startValue={0} endValue={70} />
          <Range startValue={70} endValue={91} />
          <Range startValue={91} endValue={112} />
          <Range startValue={112} endValue={160} />
        </RangeContainer>
        <Tooltip enabled={true} />
        <Title text="Average Decibels For Room">
          <Font size={20} color="gray" />
        </Title>
        <Export enabled={false} />
      </CircularGauge>
    );
}

 
return (
    renderContainer //Render the dom elements, or, when this.state == false, nothing.
    
  )

}

  
}

export default AvgGauge;