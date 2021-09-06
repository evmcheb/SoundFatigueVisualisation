import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import classNames from "classnames";
import axios from "axios";



export default function FetchData({childToParent}) { {
    const [bigChartData, setbigChartData] = useState("data1");
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

    const data = fetchData.db
    const { items } = data;
    const myObjStr = JSON.stringify(items);
    console.log(myObjStr);
    return <div>{(data)}</div>
}
}