
import React from 'react'

///this fetch call does not get the live readings it just gets the last data point 
var rdata = [];
var done = -1;
export default class FetchDataAVG extends React.Component {
    intervalID;

    state = {
        room: "None",
        rdata: [],
        done: -1
    }
    
    
    componentDidMount(){
        this.getData();
    }

    componetWillUnmount(){
        clearTimeout(this.intervalID);
    }

    getData = async() =>{
        
        var url = "http://127.0.0.1:8000/rooms/";
        url = url.concat(this.props.date);
        url = url.concat("/");
        const response = await fetch(url);
        const data =  await response.json();
        this.intervalID = setTimeout(this.getData.bind(this), 15000);//refresh data every 15 seconds

        this.setState(prevState => ({
           rdata: data[0]
        }))

        done = 1;
        rdata = data[0];
        
    }

    render() {
       return null;
    }
}

export{
    rdata, done
};