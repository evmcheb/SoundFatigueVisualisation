import React, {useState, useEffect} from "react"
import axios from 'axios';

const FetchData = () => {
    const [fetchedData, setFetchedData] = useState('');
    const url = 'http://127.0.0.1:8000/'
    
    useEffect( () => { 
        getData();
    }, []);

    const getData = () => {
        axios.get(`${url}room/1`)

        .then((response) => {
            const data = response.data[0]   
            setFetchedData(data);
        })
        .catch(error => console.error(`Error: ${error}`));
    }
    
    console.log(fetchedData.dB);
    return <div>{fetchedData.dB}</div>
}

export default FetchData