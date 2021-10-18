import React from 'react';
import { CircularGauge, Scale, Label, RangeContainer, Range, Title, Font, Export ,Tooltip} from 'devextreme-react/circular-gauge';
import { maxDecibel,done} from "../FetchData/FetchRoomData";

class MaxGuage extends React.Component {

  
   
    constructor(props) {
        super(props);
        this.state = {
          data: {maxDecibel},
          render:false
        };
        
        
      }

      componentDidMount(){
        
          setTimeout(function(){
              this.setState({render:true})
          }.bind(this),700)
          
          this.interval = setInterval(() => this.setState({data: {maxDecibel}}), 16300);

          
      }
     

      render(){
        
        let renderContainer = false;
     
        if(this.state.render) {
            console.log({done})
            if(done===1 && this.state.data.maxDecibel===0){
                
                this.setState({data: {maxDecibel}});
                console.log(this.state.data)
            }
            if(done===-1){
                this.componentDidMount();
            }

    return (
      <>
        
      <CircularGauge
        id="gauge"
        value={this.state.data.maxDecibel}
        
      >
        <Scale startValue={0} endValue={maxDecibel+20} tickInterval={10}>
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
           <Font size={20} color="gray" />
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

export default MaxGuage;