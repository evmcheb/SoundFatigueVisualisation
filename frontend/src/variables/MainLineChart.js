import React,{useRef,useState,useEffect} from 'react'
import {select,selectAll,Selection} from 'd3-selection'
import {scaleLinear,scaleBand} from 'd3-scale'
import {max} from 'd3-array'
import {axisLeft, axisBottom} from 'd3-axis'
import FetchData from 'FetchData/FetchData'



const dimensions = {
  width :1500,
  height:200
}

export default function MainLineChart()  {
    


    const ref = useRef(null)
    const [selection,setSelection] = useState(null)


    const[data,setData]= useState('')
    const childToParent = (childdata) =>{
        setData(childdata)
    }
   
    


    let y = scaleLinear()
      .domain([0,max(data,d=>d['Recorded Value (dBA)'])])
      .range([dimensions.height,0])

    const x = scaleBand()
      .domain(data.map(d=>String(d['Time (seconds)'])))
      .range([0,dimensions.width])
      .paddingInner(0.05)


    useEffect(()=>{
      if(!selection){
        setSelection(select(ref.current))
      }
      else{
        selection
          .append("g")
          .attr("class", "grid")
          .call(axisLeft(y)
                .tickSize(-dimensions.width)
                
          )
          .selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .attr('width',x.bandwidth)
          .attr('height',d=>dimensions.height- y(d['Recorded Value (dBA)']))
          .attr('x',d=>x(String(d['Time (seconds)'])))
          .attr('y',d=>y(d['Recorded Value (dBA)']))
          .attr("fill", function(d, i) {
            return d['Recorded Value (dBA)'] > 60 ? "red" : "grey";
            })
          
              
          
      }

    },[selection])

    useEffect(()=>{
      if(selection){
        let y = scaleLinear()
        .domain([0,max(data,d=>d['Recorded Value (dBA)'])])
        .range([dimensions.height,0])

        const x = scaleBand()
          .domain(data.map(d=>String(d['Time (seconds)'])))
          .range([0,dimensions.width])
          .paddingInner(0.05)

          const rects = selection.selectAll('rect').data(data)

          rects
            .exit()
            .remove()

          rects
          .attr('width',x.bandwidth)
          .attr('height',d=>dimensions.height- y(d['Recorded Value (dBA)']))
          .attr('x',d=>x(String(d['Time (seconds)'])))
          .attr('y',d=>y(d['Recorded Value (dBA)']))
          .attr("fill", function(d, i) {
            return d['Recorded Value (dBA)'] > 60 ? "red" : "grey";
            })

          rects
            .enter()
            .append('rect')
            .attr('width',x.bandwidth)
            .attr('height',d=>dimensions.height- y(d['Recorded Value (dBA)']))
            .attr('x',d=>x(String(d['Time (seconds)'])))
            .attr('y',d=>y(d['Recorded Value (dBA)']))
            .attr("fill", function(d, i) {
              return d['Recorded Value (dBA)'] > 60 ? "red" : "grey";
              })
      }


    },[data])

    
    const addRandom = () =>{
      const dataToBeAdded = {
        "Recorded Value (dBA)": Math.floor(Math.random()*(18.6)+48.3),
        "Time (seconds)": data.length+1
      }
      
      setData([...data,dataToBeAdded])
    }

    const removeLast = ()=>{
      if(data.length ===0){
        return
      }
      const slicedData = data.slice(0,data.length-1)
      setData(slicedData)


    }
    
    return (
      <div>
         <FetchData childToParent={childToParent}/>
        <svg ref={ref} width={dimensions.width} height ={dimensions.height}/>
        <button onClick={addRandom}>Add Random</button>
        <button onClick={removeLast}>Remove Last</button>
      </div>
    );
}

