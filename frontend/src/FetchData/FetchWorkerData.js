
import React from 'react'

///
var workerData = [];

var avgDecibel = 0;
var areas =[];
var averageDecibelColour = '';
var maxDecibel = -Number.MIN_VALUE;
var done = -1;
var barChartData =[{bar:"Bar1",value:0.01},{bar:"Bar1",value:0.01},{bar:"Bar1",value:0.01},{bar:"Bar1",value:0.01},{bar:"Bar1",value:0.01},{bar:"Bar1",value:0.01},{bar:"Bar1",value:0.01},{bar:"Bar1",value:0.01},{bar:"Bar1",value:0.01}];
var totalDosage = 0;
var averagesOverHours = [{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01},{hour:"",value:0.01}];
var maxDbHours = [{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01},{time:'0',values:0.01}];
var currentRoom = null;
export default class FetchWorkerData extends React.Component {
    intervalID;
     
    state = {
        loading:true,
        dbs: [],
        timeStamp: [],
        workerData:{args:0,y1:0,},
        areas:{risk:"None",area: 0},
        done:-1,
        barChartData: {bar:"None",value:0},
        averagesOverHours: {hour:"None",value:0},
        maxDbHours :{time:'None',value:0},
        currentRoom:null,
    };
    
    
    componentDidMount(){
      
        this.getData();
    }

    componetWillUnmount(){
        clearTimeout(this.intervalID);
    }

    getData = async() =>{
       

  
        console.log("Getting data ",this.props.id,"for date",this.props.date,)
        var url = "http://127.0.0.1:8000/officer/";
        url = url.concat(this.props.id);
        url = url.concat("/");
        url = url.concat(this.props.date);
        url = url.concat("/");
        console.log("the url",url)
        const response = await fetch(url);
        const data =  await response.json();
        this.intervalID = setTimeout(this.getData.bind(this),15000);//refresh data every 15 seconds
        
        if(data.length === 0){
            //No data in api
           
           return -1;
        }
        this.setState(prevState => ({
            dbs: [...prevState.dbs, data.dB]
        }))
        
        
        this.setState(prevState => ({
           timeStamp: [...prevState.timeStamp, data.x]
        }))
        this.setState({loading:false})
        this.setState({room:this.props.room})
        
        var amountDecibels = 0;

        
        //For pie chart
        var safeInt=0;
        var dangerousInt=0;
        var threateningInt=0;
        var unSafeInt = 0;
        workerData = [];
        areas = [];
        barChartData = [];
        var bar1 = 0;
        var bar2 = 0;
        var bar3 = 0;
        var bar4 = 0;
        var bar5 = 0;
        var bar6 = 0;
        var bar7 = 0;
        var bar8 = 0;
        var bar9 = 0;
        
        totalDosage = 0.01;
        
        

    //    Getting averages over hours of day
        var hours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        var decibelHours= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      
   
        var averagesHours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        
        var maxDbInHours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var timeOfMaxDbHour = ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"];
        
        for(var i=0; i< data.dB.length; i++){
            var decibels = data.dB[i];
            var timestamp = data.x[i];
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
                    maxDbInHours[hour] = decibels;
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
            //For Dosimeter
            
            if(decibels>=85 && decibels<88){
                bar1+=1;
                totalDosage += (1/28800)*100
            
            }
            else if(decibels>=88 && decibels<91){
                bar2+=1;
                totalDosage += (1/14400)*100
            }
            else if(decibels>=91 && decibels<94){
                bar3+=1;
                totalDosage += (1/7200)*100
            }
            else if(decibels>=94 && decibels<97){
                bar4+=1;
                totalDosage += (1/3600)*100
            }
            else if(decibels>=97 && decibels<100){
                bar5 +=1;
                totalDosage += (1/1800)*100
            }
            else if(decibels>=100 && decibels<103){
                bar6+=1;
                totalDosage += (1/900)*100
            }
            else if (decibels>=103 && decibels<106){

                bar7+=1;
                totalDosage += (1/450)*100
            }
            else if (decibels>=106 && decibels<109){
                
                bar8+=1;
                totalDosage += (1/225)*100
            }
            else if(decibels>=109){
                bar9 +=1;
                totalDosage += (1/110)*100
            }
            
            //pushing values for main graph
            workerData.push({arg:timestamp, y1:decibels});
            
            //Getting max dB value
            if(decibels>maxDecibel){
              
                maxDecibel = decibels;
               
            }        
        }
          //pushing averages to array for dsiplaying
        averagesOverHours = []
        maxDbHours=[]
        for (var j = 0;j<24;j++){
            
            if(decibelHours[j] === 0 || hours[j] === 0){
                averagesHours[j] = 0
            }
           averagesHours[j] = (decibelHours[j]/hours[j]).toFixed(2);
           averagesOverHours.push({hour:"hour"+j,value:averagesHours[j]});
          
           maxDbHours.push({time:timeOfMaxDbHour[j],value:maxDbInHours[j]});
           
        }

            //pushing values for pie chart
          areas.push({risk:"Safe",area:safeInt});
          areas.push({risk:"Dangerous",area:dangerousInt});
          
          areas.push({risk:"UnSafe",area:unSafeInt});
          areas.push({risk:"Threatening",area:threateningInt});

          //pushing values for dosimeter
          if(bar1!==0){
          barChartData.push({bar:"Bar1",value:bar1});
  
          }
        else{
              // have to give it a value that isnt 0 or undefined otherwise page crashes
            barChartData.push({bar:"Bar1",value:0.01});
   
          }
          if(bar2!==0){
            barChartData.push({bar:"Bar2",value:bar2});
         
        }
        else{
          barChartData.push({bar:"Bar2",value:0.01});
        
        }
        if(bar3!==0){
            
            barChartData.push({bar:"Bar3",value:bar3});
          
            }
        else{
              barChartData.push({bar:"Bar3",value:0.01});
              
        }
        if(bar4!==0){
            
            barChartData.push({bar:"Bar4",value:bar4});
         
            }
        else{
              barChartData.push({bar:"Bar4",value:0.01});
              
        }
        if(bar5!==0){
            barChartData.push({bar:"Bar5",value:bar5});
            
            }
        else{
              barChartData.push({bar:"Bar5",value:0.01});
              
            }
        if(bar6!==0){
            barChartData.push({bar:"Bar6",value:bar6});
          
            }
        else{
            barChartData.push({bar:"Bar6",value:0.01});
            
        }
        if(bar7!==0){
            barChartData.push({bar:"Bar7",value:bar7});
            
            }
        else{
            barChartData.push({bar:"Bar7",value:0.01});
           
            }
        if(bar8!==0){
            barChartData.push({bar:"Bar8",value:bar8});
            
            }
        else{
            barChartData.push({bar:"Bar8",value:0.01});
            
            }
        if(bar9!==0){
            
            barChartData.push({bar:"Bar9",value:bar9});
            
            }
        else{
            barChartData.push({bar:"Bar9",value:0.01});
            
          }


          
          avgDecibel = amountDecibels/data.dB.length;
          avgDecibel = avgDecibel.toFixed(2);
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
        

        
        currentRoom = data.CurrentRoom;
        
        if(workerData.length ===0){
            workerData.push({arg:1, y1:1});

        }
        totalDosage = totalDosage.toFixed(2);
        
        done = 1;
          this.setState({workerData})
          this.setState({avgDecibel})
          this.setState({areas})
          this.setState({averageDecibelColour})
          this.setState({maxDecibel})
          
          this.setState({barChartData})
          this.setState({totalDosage})
          this.setState({averagesOverHours})
          this.setState({maxDbHours})
          this.setState({currentRoom})
          
          this.setState({done})

          
    }

    render() {
       
        
       return(
        <>

        </>
        )
       
    }
}

export{
    workerData,
    avgDecibel,
    areas,
    averageDecibelColour,
    maxDecibel,
    done,
    barChartData,
    totalDosage,
    averagesOverHours,
    maxDbHours,
    currentRoom
};