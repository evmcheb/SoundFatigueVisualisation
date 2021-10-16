import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";


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

   console.log("New Date Pressed")
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
          <label style={{ marginBottom: 20 }}>Select New Date To Display</label>
          <DatePicker
            selected={selectedDate.data}
            dateFormat="dd/MM/yyyy"
            onChange={handleselectedDate}
            maxDate = {moment().toDate()}
          />
          
        </div>
        <button type="button" className="btn btn-info" onClick={displayNewDate} style={{ marginTop: 30,marginBottom:20 }}>
                            View New date
                            </button>
       
      </div>
      
     

    </div>
  );
}


export{
    passDate
};