// import React and DatePicker
import React, { useState } from "react";
import DatePicker from "react-datepicker";

// import required css from library
import "react-datepicker/dist/react-datepicker.css";

// time-picker component. using showTimeSelect as a main props and works with basic functionality on react-datepicker that explained above
const TheTimePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      dateFormat="Pp"
    />
  );
};

export default TheTimePicker;