import React, { useState, forwardRef } from "react";

import DatePicker from "react-datepicker";

import DateFilterStyles from "./DateFilter.module.css";

function DateFilter(props) {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return (
    <div className={DateFilterStyles.DateFilter}>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={<ExampleCustomInput />}
      />
    </div>
  );
}

export default DateFilter;
