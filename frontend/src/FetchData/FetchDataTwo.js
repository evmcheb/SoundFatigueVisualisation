import React from 'react'
//
var zoomingData = [];
var lastTime= 0;
var startTime =0;
var avgDecibel = 0;
var areas =[];
export default class FetchDataTwo extends React.Component {

    state = {
        loading:true,
        dbs: [],
        timeStamp: [],
        zoomingData:{args:0,y1:0},
        areas:{risk:"None",area: 0}
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
        var amountDecibels = 0;


        //For pie chart
        var safeInt=0;
        var dangerousInt=0;
        var threateningInt=0;
        var unSafeInt = 0;
        //{ arg: 10, y1: -12 },
        for(var i=0; i< data[0].dB.length; i++){
            var decibels = data[0].dB[i];
            var timestamp = data[0].x[i];
            amountDecibels += decibels;
            
            //For pie chart
            if(decibels <=70){
                safeInt +=1;
            }
            else if(decibels<=91 && decibels>=71){
                dangerousInt +=1;
            }
            else if(decibels<=112 && decibels>=92){
                threateningInt+=1;
            }
            else if(decibels>=113){
                unSafeInt +=1;
            }
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


          areas.push({risk:"Safe",area:safeInt});
          areas.push({risk:"Dangerous",area:dangerousInt});
          
          areas.push({risk:"UnSafe",area:unSafeInt});
          areas.push({risk:"Threatening",area:threateningInt});



          avgDecibel = amountDecibels/data[0].dB.length;
          this.setState({zoomingData})
          this.setState({lastTime})
          this.setState({avgDecibel})
          this.setState({areas})
        
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
    startTime,
    avgDecibel,
    areas
};