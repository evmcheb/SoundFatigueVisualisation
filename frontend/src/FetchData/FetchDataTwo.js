import axios from 'axios';
import React from 'react'
import TheDateBox, { passDate } from '../variables/TheDateBox';
///
var zoomingData = [];
var lastTime= 0;
var startTime =0;
var avgDecibel = 0;
var areas =[];
var averageDecibelColour = '';
var maxDecibel = -Number.MIN_VALUE;
var maxDbTime = 0;
var maxValues = [];
var timesOfConcern = [];
var done = -1;
var isOkay = -1;
var worker = [];
export default class FetchDataTwo extends React.Component {
    intervalID;
     
    state = {
        loading:true,
        dbs: [],
        timeStamp: [],
        zoomingData:{args:0,y1:0,},
        areas:{risk:"None",area: 0},
        worker:{worderId:-1,checkIn:0,checkOut:0},
        timesOfConcern:{startTimeCon:0,endTimeCon:0,worker:0},

        done:-1,
        maxValues:{x:0,y:0},
        isOkay:-1
    };
    
    
    componentDidMount(){

        this.getData();
    }

    componetWillUnmount(){
        clearTimeout(this.intervalID);
    }

    getData = async() =>{

        console.log("Getting data")
        
        var url = "http://127.0.0.1:8000/room/3/";
        //url = url.concat(passDate);
        console.log(url)
        const response = await fetch(url);
        const data =  await response.json();
        this.intervalID = setTimeout(this.getData.bind(this), 10000);//refresh data every 10 seconds
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
        zoomingData = [];
        areas = [];
        maxValues = [];
        
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
            //var date = new Date(timestamp * 1000);
            //var hours = date.getHours();
            //var minutes = "0" + date.getMinutes();
            
           // var seconds = "0" + date.getSeconds();     
            //var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            //var formattedTime = new Date(timestamp*1000).toLocaleTimeString('en-US');
            //console.log(formattedTime)
            lastTime = timestamp;
            //lastTime = timestamp;
            if(i === data[0].dB.length-100){
               //startTime = formattedTime;
               startTime = timestamp;
            }
           
            



            zoomingData.push({arg:timestamp, y1:decibels});
            

            
            //Getting max dB value
            if(decibels>maxDecibel){
              
                maxDecibel = decibels;
                maxDbTime = timestamp;
               
            }        
          }
          
          //Times of concern for 80 db+ => damage to hearing after 2 hours
          for(var j=0; j< data[0].dB.length; j++){
            var dB = data[0].dB[j];
            var timestamp80 = data[0].x[j];
            if(dB>=80){
                var startTimeConcern = timestamp80;
                j++;
                var endTimeConcern =0;
                while(data[0].dB[j]>=80){
                    
                    endTimeConcern = data[0].x[j];
                    j++;
                }
                if(endTimeConcern!=0 && (endTimeConcern-startTimeConcern== 7200)){
                timesOfConcern.push({startTimeCon:startTimeConcern,endTimeCon:endTimeConcern});
                }
            }
          }
          //Times of concern for 85 db+ => damage to hearing after 50 minutes
          for(var k=0; k< data[0].dB.length; k++){
            var dB = data[0].dB[k];
            var timestamp85 = data[0].x[k];
            if(dB>=85){
                var startTimeConcern = timestamp85;
                k++;
                var endTimeConcern =0;
                while(data[0].dB[j]>=85){
                    
                    endTimeConcern = data[0].x[k];
                    k++;
                }
                if(endTimeConcern!=0 && (endTimeConcern-startTimeConcern== 3000)){
                timesOfConcern.push({startTimeCon:startTimeConcern,endTimeCon:endTimeConcern});
                }
            }
          }
          //Times of concern for 100 db+ => damage to hearing after 15 minutes
          for(var l=0; l< data[0].dB.length; l++){
            var dB = data[0].dB[l];
            var timestamp100 = data[0].x[l];
            if(dB>=100){
                var startTimeConcern = timestamp100;
                k++;
                var endTimeConcern =0;
                while(data[0].dB[l]>=100){
                    
                    endTimeConcern = data[0].x[l];
                    l++;
                }
                if(endTimeConcern!=0 && (endTimeConcern-startTimeConcern== 900)){
                timesOfConcern.push({startTimeCon:startTimeConcern,endTimeCon:endTimeConcern});
                }
            }
          }
          //Times of concern for 105 db+ => damage to hearing after 5 minutes
          for(var m=0; m< data[0].dB.length; m++){
            var dB = data[0].dB[m];
            var timestamp105 = data[0].x[m];
            if(dB>=105){
                var startTimeConcern = timestamp105;
                k++;
                var endTimeConcern =0;
                while(data[0].dB[m]>=105){
                    
                    endTimeConcern = data[0].x[m];
                    m++;
                }
                if(endTimeConcern!=0 && (endTimeConcern-startTimeConcern== 300)){
                timesOfConcern.push({startTimeCon:startTimeConcern,endTimeCon:endTimeConcern});
                }
            }
          }
          //Times of concern for 110 db+ => damage to hearing after 2 minutes
          for(var n=0; n< data[0].dB.length; n++){
            var dB = data[0].dB[n];
            var timestamp110 = data[0].x[n];
            if(dB>=110){
                var startTimeConcern = timestamp110;
                n++;
                var endTimeConcern = 0;
                while(data[0].dB[n]>=110){
                    
                    endTimeConcern = data[0].x[n];
                    n++;
                }
                if(endTimeConcern!=0 && (endTimeConcern-startTimeConcern== 120)){
                timesOfConcern.push({startTimeCon:startTimeConcern,endTimeCon:endTimeConcern});
                }
            }
          }
          //Times of concern for 120 db+ => damage to hearing after any amount of time
          for(var p=0; p< data[0].dB.length; p++){
            var dB = data[0].dB[p];
            var timestamp120 = data[0].x[p];
            if(dB>=120){
                var startTimeConcern = timestamp120;
                p++;
                var endTimeConcern = 0;
                while(data[0].dB[p]>=120){
                    
                    endTimeConcern = data[0].x[p];
                    p++;
                }
                if(endTimeConcern!=0 ){
                timesOfConcern.push({startTimeCon:startTimeConcern,endTimeCon:endTimeConcern});
                }
                if(endTimeConcern ==0){
                    timesOfConcern.push({startTimeCon:startTimeConcern,endTimeCon:startTimeConcern});

                }
            }
          }
          if(timesOfConcern.length>0){
              isOkay =1;
          }


           
            //COnverting maxDbTime to hour:min:sec
            var date = new Date(maxDbTime * 1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();     
            maxDbTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            maxValues.push({x:maxDbTime, y:maxDecibel});
            

          areas.push({risk:"Safe",area:safeInt});
          areas.push({risk:"Dangerous",area:dangerousInt});
          
          areas.push({risk:"UnSafe",area:unSafeInt});
          areas.push({risk:"Threatening",area:threateningInt});



          avgDecibel = amountDecibels/data[0].dB.length;
          avgDecibel = avgDecibel.toFixed(2);
          //Determing what colour of average decibels
        if(avgDecibel <=70){
            averageDecibelColour = "green";
            }
        else if(avgDecibel<=91 && avgDecibel>=71){
            averageDecibelColour ="yellow";
        }
        else if(avgDecibel<=112 && avgDecibel>=92){
            averageDecibelColour ="orange";
        }
        else if(avgDecibel>=113){
            averageDecibelColour ="red";
        }
        done = 1;

        
        worker.push({workerId:1,checkIn:1632428957,checkOut:1632429709})
        zoomingData.push({timeSheet:worker});
        console.log("RIGHT HERE",zoomingData)
          this.setState({zoomingData})
          this.setState({lastTime})
          this.setState({avgDecibel})
          this.setState({areas})
          this.setState({averageDecibelColour})
          this.setState({maxDecibel})
          this.setState({maxDbTime})
          this.setState({timesOfConcern})
          this.setState({done})
          this.setState({maxValues})
          this.setState({isOkay})

         
          
    }

    render() {
       
        
       return(
        <>
        <div>
          {lastTime}
        </div>
        </>
        )
       
    }
}

export{
    zoomingData,
    lastTime,
    startTime,
    avgDecibel,
    areas,
    averageDecibelColour,
    maxDecibel,
    maxDbTime,
    timesOfConcern,
    done,
    maxValues,
    isOkay
};