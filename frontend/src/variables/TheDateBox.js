import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import FetchDataTwo from "../FetchData/FetchDataTwo";
import Button from 'react-bootstrap/Button'



var passDate = null;
export default function TheDateBox() {
  const [selectedDate, setselectedDate] = useState({data:new Date()});
  passDate = moment(selectedDate.data).format("DD-MM-YYYY");

  const handleselectedDate = (date) => {
    setselectedDate({data:date});
    passDate= moment(selectedDate.data).format("DD-MM-YYYY")
    
      
   console.log("presed")
  };


  
  return (
    <div className="App">
        
      <div className="input-container">
        <div>
          <label>Select Date To Display</label>
          <DatePicker
            selected={selectedDate.data}
            dateFormat="dd/MM/yyyy"
            onChange={handleselectedDate}
            maxDate = {moment().toDate()}
          />
          
        </div>
       
      </div>
      {selectedDate  && (
        <div className="summary">
          <p>
            Viewing data for {moment(selectedDate.data).format("LL")} 
            
          </p>
        </div>
      )}

    </div>
  );
}


export{
    passDate
};