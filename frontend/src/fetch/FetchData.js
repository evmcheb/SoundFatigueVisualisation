import React, {useState, useEffect} from "react"
import axios from 'axios';

const FetchData = () => {
    const [fetchedData, setFetchedData] = useState('');
    const url = 'http://127.0.0.1:8000/'
    
    useEffect( () => { 
        getData();
    }, []);

    const getData = () => {
        axios.get(`${url}0`)
        .then((response) => {
            const data = response.data
            setFetchedData(data);
        })
        .catch(error => console.error(`Error: ${error}`));
    }
    
    console.log(fetchedData);
    return <div>{fetchedData.day}</div>
}

export default FetchData