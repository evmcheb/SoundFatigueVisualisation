import React from 'react';
import { CircularGauge, Scale, Label, RangeContainer, Range, Title, Font, Export ,Tooltip} from 'devextreme-react/circular-gauge';
<<<<<<< HEAD
import { rdata, done } from "../FetchData/FetchDataAVG";
=======
import { avgDecibel,maxDecibel,done} from "../FetchData/FetchRoomData";
>>>>>>> ebdc63a30fa1419531b978a222801e3fbfe0ac64

class AvgGauge extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          data: {rdata},
          render:false,
          done: 1,
          data: 0,
          room: props.room,
          avgDB: rdata[this.room]
        };
        
        this.room = props.room
      }

      componentDidMount(){
        
          setTimeout(function(){
              this.setState({render:true})
          }.bind(this),700)
          
          this.interval = setInterval(() => this.setState({
            data: {rdata},
          }), 3050);
          
      }
     

      render(){
        
        let renderContainer = false
        if(this.state.render) {
            
<<<<<<< HEAD
            if(done==1 && this.state.data[0]==0){
                this.setState({data: {rdata}});
=======
            if(done===1 && this.state.data.avgDecibel===0){
                
                this.setState({data: {avgDecibel}});
>>>>>>> ebdc63a30fa1419531b978a222801e3fbfe0ac64
                 
            }
            if(done===-1){
                this.componentDidMount();
            }

    return (
        
      <CircularGauge
        id="gauge"
        value={rdata[this.room-1]}
        
      >
        <Scale startValue={0} endValue={140} tickInterval={10}>
          <Label useRangeColors={true} />
        </Scale>
        <RangeContainer palette="bright">
          <Range startValue={0} endValue={70} />
          <Range startValue={70} endValue={91} />
          <Range startValue={91} endValue={112} />
          <Range startValue={112} endValue={160} />
        </RangeContainer>
        <Tooltip enabled={true} />
        <Title text="LIVE Decibels">
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