
import React from 'react'

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
var done = -1;
var averagesOverHours = [];
var maxDbHours = [];
export default class FetchDataTwo extends React.Component {
    intervalID;
     
    state = {
        loading:true,
        dbs: [],
        timeStamp: [],
        zoomingData:{args:0,y1:0,},
        areas:{risk:"None",area: 0},

        done:-1,
        maxValues:{x:0,y:0},
        averagesOverHours: {hour:"None",value:0},
        maxDbHours :{hour:'None',value:0}
    };
    
    
    componentDidMount(){

        this.getData();
    }

    componetWillUnmount(){
        clearTimeout(this.intervalID);
    }

    getData = async() =>{

        console.log("Getting data ",this.props.room,"for date",this.props.date)
        
        var url = "http://127.0.0.1:8000/room/";
        //url = url.concat(passDate);
        url = url.concat(this.props.room);
        url = url.concat("/");
        url = url.concat(this.props.date);
        url = url.concat("/");
        console.log("the url",url)
        const response = await fetch(url);
        const data =  await response.json();
        this.intervalID = setTimeout(this.getData.bind(this), 15000);//refresh data every 15 seconds
        
        this.setState(prevState => ({
            dbs: [...prevState.dbs, data[0].dB]
        }))
        
        
        this.setState(prevState => ({
           timeStamp: [...prevState.timeStamp, data[0].x]
        }))
        this.setState({loading:false})
        this.setState({room:this.props.room})
        
        var amountDecibels = 0;

        console.log(data);
        
        //For pie chart
        var safeInt=0;
        var dangerousInt=0;
        var threateningInt=0;
        var unSafeInt = 0;
        zoomingData = [];
        areas = [];
        maxValues = [];
  
        averagesOverHours = [];
        maxDbHours = [];

    //    Getting averages over hours of day
        var hours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        var decibelHours= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      
   
        var averagesHours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        
        var maxDbInHours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var timeOfMaxDbHour = ["","","","","","","","","","","","","","","","","","","","","","","",""];
        if(data[0].dB.length == 0 ){
            console.log("empty")
            zoomingData.push({arg:"0", y1:0});
        }
        for(var i=0; i< data[0].dB.length; i++){
            var decibels = data[0].dB[i];
            var timestamp = data[0].x[i];
            amountDecibels += decibels;
            
            //for average hours
            if(timestamp != undefined){
                timestamp = timestamp.toString();
                //getting hour
                var timeSub = timestamp.substr(11,2)
                
                var hour = parseInt(timeSub)
                
               
                hours[hour] +=1;
                decibelHours[hour] += decibels;

                if(maxDbInHours[hour]<decibels){
                    maxDbInHours[hour] =decibels;
                    timeOfMaxDbHour[hour] = timestamp;
                }

            }


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

        
            
            lastTime = timestamp;
            //lastTime = timestamp;
            if(i === data[0].dB.length-100){
               //startTime = formattedTime;
               startTime = timestamp;
            }
            //var date = new Date(timestamp * 1000);
            //var hours = date.getHours();
            //var minutes = "0" + date.getMinutes();
            //var seconds = "0" + date.getSeconds();     

            //timestam = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            zoomingData.push({arg:timestamp, y1:decibels});
            
            //Getting max dB value
            if(decibels>maxDecibel){
              
                maxDecibel = decibels;
                maxDbTime = timestamp;
               
            }        
        }
        //pushing averages to array for dsiplaying
        for (var i = 0;i<24;i++){
            if(decibelHours[i] == 0 || hours[i] == 0){
                averagesHours[i] = 0
            }
           averagesHours[i] = (decibelHours[i]/hours[i]).toFixed(2);
           averagesOverHours.push({hour:"hour"+i,value:averagesHours[i]});
           maxDbHours.push({time:timeOfMaxDbHour[i],value:maxDbInHours[i]});
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
        
        
        
       
        console.log("RIGHT HERE",zoomingData)
          this.setState({zoomingData})
          this.setState({lastTime})
          this.setState({avgDecibel})
          this.setState({areas})
          this.setState({averageDecibelColour})
          this.setState({maxDecibel})
          this.setState({maxDbTime})
          this.setState({done})
          this.setState({maxValues})
          this.setState({averagesOverHours})
          this.setState({maxDbHours})
        
    }

    render() {
       
        
       return(
        <>
        <div>
          {lastTime}
            <p>
          showing data for room  :{this.props.room}
          
          </p>
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
    done,
    maxValues,
    averagesOverHours,
    maxDbHours
};