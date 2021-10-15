import React from 'react';
import { CircularGauge, Scale, Label, RangeContainer, Range, Title, Font, Export ,Tooltip} from 'devextreme-react/circular-gauge';
import { maxDecibel,done} from "../FetchData/FetchWorkerData";

class MaxWorkerGuage extends React.Component {

  
   
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
          }.bind(this),900)
          
          this.interval = setInterval(() => this.setState({data: {maxDecibel}}), 3075);

          
      }
     

      render(){
        
        let renderContainer = false;
     
        if(this.state.render) {
            
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
       
        <Title text="Max Decibel Experienced" >
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

export default MaxWorkerGuage;