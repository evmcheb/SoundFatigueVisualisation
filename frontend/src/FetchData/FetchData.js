import { useState, useEffect } from "react";
import axios from "axios";


const FetchData = () => {
    const [fetchedData, setFetchedData] = useState({});

    const url = `http://127.0.0.1:8000/room/1`

    const fetchData = async (url) => {
        console.log("Fetching data")
        return new Promise((res, rej) => {
            axios.get(url)
                .then((resp) => {
                    res(resp.data[0]);
                })
                .catch(err => rej(err))
        });
    }

    useEffect(async () => {
        let isMounted = true;
        const fetchedData = await fetchData(url);
        if (isMounted) {
            setFetchedData(fetchedData);
        }
        return () => isMounted = false;
    }, []);

    const fetchNewData = () => {
        fetchData(url).then((res) => {
            setFetchedData(res)
        })
    }

    return [fetchedData, fetchNewData];
}

export default FetchData;

