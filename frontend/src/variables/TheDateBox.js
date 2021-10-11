import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import FetchDataTwo from "../FetchData/FetchDataTwo";
import Button from 'react-bootstrap/Button'

import {Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
var passDate = null;
export default function TheDateBox(props) {
  // To have datebox displaying input date
  var dateToDisplay = props.date
  var id = props.id
  var[day,month,year] = dateToDisplay.split('-')

  const [selectedDate, setselectedDate] = useState({data:new Date(`${month}/${day}/${year}`)});
  passDate = moment(selectedDate.data).format("DD-MM-YYYY");
  const history = useHistory();
  
  const handleselectedDate = (date) => {
    setselectedDate({data:date});
    passDate= moment(selectedDate.data).format("DD-MM-YYYY")
    //window.location.reload();
    
    //window.location.reload();
   console.log("presed")
  };
  const displayNewDate = () =>{
    var newPath = "" 
    newPath = newPath.concat(id);
    newPath = newPath.concat("~");
    newPath = newPath.concat(passDate);
    history.push(newPath);
    window.location.reload();
    console.log(passDate)
  }



  
  return (
    <div className="App">
        
      <div className="input-container">
        <div>
          <label>Select New Date To Display</label>
          <DatePicker
            selected={selectedDate.data}
            dateFormat="dd/MM/yyyy"
            onChange={handleselectedDate}
            maxDate = {moment().toDate()}
          />
          
        </div>
        <button type="button" className="btn btn-info" onClick={displayNewDate} >
                            View New date
                            </button>
       
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