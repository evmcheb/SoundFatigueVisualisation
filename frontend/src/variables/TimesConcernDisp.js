import React from 'react'
import { timesOfConcern } from '../FetchData/FetchDataTwo'
import { Dropdown} from 'react-bootstrap';
function TimesConcernDisp() {
    return (
        
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Times Of Concern
                </Dropdown.Toggle>

                <Dropdown.Menu style={{overflowY: "scroll"  ,height: " 300px"}}>
                <Dropdown.Item href="#/action-1">Example</Dropdown.Item>
 
            
            {timesOfConcern.map((itemDetail,index)=>{
                return(
                    <Dropdown.Item>
                    {itemDetail.startTimeCon} - {itemDetail.endTimeCon}
                    </Dropdown.Item>
                )
            })}
            </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default TimesConcernDisp
