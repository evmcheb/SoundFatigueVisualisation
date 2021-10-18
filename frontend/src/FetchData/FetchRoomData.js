
import React from 'react'

// Declaring variables for data collection
var zoomingData = [];
var pitchData = [];
var lastTime= 0;
var startTime =0;
var avgDecibel = 0;
var avgPitch = 0;
var areas =[];
var averageDecibelColour = '';
var maxDecibel = -Number.MIN_VALUE;
var done = -1;
var averagesOverHours = [{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01},{hour:"0",value:0.01}];
var maxDbHours = [{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01},{time:"0",values:0.01}];
export default class FetchRoomData extends React.Component {
    intervalID;
    state = {
        loading:true,
        dbs: [],
        timeStamp: [],
        zoomingData:{args:0,y1:0,},
        areas:{risk:"None",area: 0},
        pitchData:{args:0,y1:0},
        done:-1,
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
        url = url.concat(this.props.room);
        url = url.concat("/");
        url = url.concat(this.props.date);
        url = url.concat("/");
        console.log("the url",url)
        const response = await fetch(url);
        const data =  await response.json();
        this.intervalID = setTimeout(this.getData.bind(this), 10000);//Fetch Data every 10 seconds
        
        this.setState(prevState => ({
            dbs: [...prevState.dbs, data[0].dB]
        }))
        
        
        this.setState(prevState => ({
           timeStamp: [...prevState.timeStamp, data[0].x]
        }))
        this.setState({loading:false})
        this.setState({room:this.props.room})
        
        var amountDecibels = 0;
        var amountPitches = 0;
        //For pie chart
        var safeInt=0;
        var dangerousInt=0;
        var threateningInt=0;
        var unSafeInt = 0;
        zoomingData = [];
        pitchData = [];
        areas = [];
        
        // For Vertical bullet chart
        averagesOverHours = [];
        maxDbHours = [];

    //    Getting averages over 34 hours of day
        var hours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        var decibelHours= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      
        var averagesHours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        
        var maxDbInHours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var timeOfMaxDbHour = ["","","","","","","","","","","","","","","","","","","","","","","",""];
        if(data[0].dB.length === 0 ){ 
            // if data is empty push 0 values so page does not crash
            zoomingData.push({arg:"0", y1:0});
            pitchData.push({arg:"0",y1:0});
        }
        for(var i=0; i< data[0].dB.length; i++){
            var decibels = data[0].dB[i];
            var timestamp = data[0].x[i];
            var pitch = data[0].pitch[i];
            amountPitches += pitch;
            amountDecibels += decibels;
            //for average hours
            if(timestamp !== undefined){
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
               
               startTime = timestamp;
            }

            zoomingData.push({arg:timestamp, y1:decibels});
            pitchData.push({arg:timestamp,y1:pitch});
            //Getting max dB value
            if(decibels>maxDecibel){
                maxDecibel = decibels;
               
            }        
        }
        averagesOverHours = []
        maxDbHours=[]
        //pushing averages to array for dsiplaying
        for (var j = 0;j<24;j++){
            if(decibelHours[j] === 0 || hours[j] === 0){
                averagesHours[j] = 0;
                
            }
           averagesHours[j] = (decibelHours[j]/hours[j]).toFixed(2);
           averagesOverHours.push({hour:"hour"+j,value:averagesHours[j]});
           maxDbHours.push({time:timeOfMaxDbHour[j],value:maxDbInHours[j]});
        }
          
            // pushing pie chart values
          areas.push({risk:"Safe",area:safeInt});
          areas.push({risk:"Dangerous",area:dangerousInt});
          areas.push({risk:"UnSafe",area:unSafeInt});
          areas.push({risk:"Threatening",area:threateningInt});

   

            //Getting average over all data
          avgDecibel = amountDecibels/data[0].dB.length;
          avgDecibel = avgDecibel.toFixed(2);
          avgPitch = amountPitches/data[0].pitch.length;
          avgPitch = avgPitch.toFixed(2);
          //Determing what colour of average decibels line should be on main graph
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
        
    
            // Setting states for exportation
          this.setState({zoomingData})
          this.setState({pitchData})
          this.setState({lastTime})
          this.setState({avgDecibel})
          this.setState({avgPitch})
          this.setState({areas})
          this.setState({averageDecibelColour})
          this.setState({maxDecibel})
          this.setState({done})
          this.setState({averagesOverHours})
          this.setState({maxDbHours})
        
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
    areas,
    averageDecibelColour,
    maxDecibel,
    done,
    averagesOverHours,
    maxDbHours,
    pitchData,
    avgPitch
};