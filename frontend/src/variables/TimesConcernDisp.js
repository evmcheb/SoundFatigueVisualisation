import React from 'react'
import { timesOfConcern ,done, isOkay} from '../FetchData/FetchDataTwo'
import { Dropdown} from 'react-bootstrap';

class TimesConcernDisp extends React.Component {


   
    constructor(props) {
        super(props);
        this.state = {
          data: {timesOfConcern},
          render:false
        };
       
        
      }

      componentDidMount(){
        
          setTimeout(function(){
              this.setState({render:true})
          }.bind(this),500)
          
          
          
      }
     

      render(){
        
        let renderContainer = false
        if(this.state.render) {
            
            if(isOkay ==1 && done==1 && this.state.data.timesOfConcern==0){
                
                this.setState({data: {timesOfConcern}});
                 
            }
            
            if(done==-1 ){
                this.componentDidMount();
            }

    return (
        
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Times Of Concern
                </Dropdown.Toggle>

                <Dropdown.Menu style={{overflowY: "scroll"  ,height: " 300px"}}>
                <Dropdown.Item href="#/action-1">Example</Dropdown.Item>
 
            
            {this.state.data.timesOfConcern.map((itemDetail,index)=>{
                return(
                    <Dropdown.Item>
                    {itemDetail.startTimeCon} - {itemDetail.endTimeCon}
                    </Dropdown.Item>
                )
            })}
            </Dropdown.Menu>
            </Dropdown>
        </div>
);
}

 
return (
    renderContainer //Render the dom elements, or, when this.state == false, nothing.
    
  )

}

  
}


export default TimesConcernDisp;

