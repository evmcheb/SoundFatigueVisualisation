import React from 'react'
import { zoomingData } from "../FetchData/FetchDataTwo";
function AvgValue() {

    var data = [
        {tv: 1, radio:5, fridge:4},
        {tv: 2, radio:2, fridge:null},
        {tv: 3, radio:6, fridge:5}
    ];
    
    var avg = Array.from(zoomingData.reduce(
            (acc, obj) => Object.keys(obj).reduce( 
                (acc, key) => typeof obj[key] == "number"
                    ? acc.set(key, (acc.get(key) || []).concat(obj[key]))
                    : acc,
            acc),
        new Map()), 
            ([name, values]) =>
                ({ name, average: values.reduce( (a,b) => a+b ) / values.length })
        );
    
    console.log(avg);





    return (
        <div>
        
        </div>
    )
}

export default AvgValue
