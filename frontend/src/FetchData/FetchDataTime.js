import React from 'react'

export default class FetchDataTwo extends React.Component {

    state = {
        loading:true,
        dbs: [],
        timeStamp: [],
        theJson : null
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
        this.setState({theJson: data,loading:false})
        

    }

    render() {
        return(
        <div>
            {this.state.loading || !this.state.dbs ? <div>loading..</div> :<div>{this.state.timeStamp}</div>}
        </div>
        )
    }
}
