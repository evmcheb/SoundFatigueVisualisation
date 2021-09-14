import React from 'react'
import { timesOfConcern } from '../FetchData/FetchDataTwo'

function TimesConcernDisp() {
    return (
        <div>
            {timesOfConcern.map((itemDetail,index)=>{
                return(
                <span>
                    {itemDetail.startTimeCon} - {itemDetail.endTimeCon}, {'\u00A0'}
                </span>
                )
            })}
        </div>
    )
}

export default TimesConcernDisp
