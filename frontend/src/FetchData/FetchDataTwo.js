import React from 'react'

var zoomingData = [];
var lastTime= 0;
var startTime =0;
export default class FetchDataTwo extends React.Component {

    state = {
        loading:true,
        dbs: [],
        timeStamp: [],
        zoomingData:{args:0,y1:0}
    };

    async componentDidMount(){
        const url = "http://127.0.0.1:8000/room/1/";
        const response = await fetch(url);
        const data =  await response.json();
        this.setState(prevState => ({
            dbs: [...prevState.dbs, data[0].dB]
        }))
        this.setState(prevState => ({
           timeStamp: [...prevState.timeStamp, data[0].x]
        }))
        this.setState({loading:false})

        //{ arg: 10, y1: -12 },
        for(var i=0; i< data[0].dB.length; i++){
            var decibels = data[0].dB[i];
            var timestamp = data[0].x[i];
        //    var date = new Date(timestamp * 1000);
          //  var hours = date.getHours();
            //var minutes = "0" + date.getMinutes();
            
            //var seconds = "0" + date.getSeconds();     
            //var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            //lastTime = formattedTime;
            lastTime = timestamp;
            if(i == data[0].dB.length-100){
               //startTime = formattedTime;
               startTime = timestamp;
            }
           // zoomingData.push({arg:formattedTime, y1:decibels});
           zoomingData.push({arg:timestamp, y1:decibels});
          }
          
          this.setState({zoomingData})
          this.setState({lastTime})
        
    }

    render() {
       return(
        <>
        </>
        )
    }
}

export{
    zoomingData,
    lastTime,
    startTime
};