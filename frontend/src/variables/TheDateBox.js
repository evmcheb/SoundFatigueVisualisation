import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";



var passDate = null;
export default function TheDateBox() {
  const [selectedDate, setselectedDate] = useState({data:new Date()});
  passDate = moment(selectedDate.data).format("DD/MM/YYYY");

  const handleselectedDate = (date) => {
    setselectedDate({data:date});
    passDate= moment(selectedDate.data).format("DD/MM/YYYY")
  };

  
  
  return (
    <div className="App">
      <div className="input-container">
        <div>
          <label>Select Date For Display</label>
          <DatePicker
            selected={selectedDate.data}
            dateFormat="dd/MM/yyyy"
            onChange={handleselectedDate}
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