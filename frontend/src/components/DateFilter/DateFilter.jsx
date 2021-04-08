import React, { useState, forwardRef } from "react";

import { Button, UncontrolledTooltip } from "reactstrap";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import DateFilterStyles from "./DateFilter.module.css";

// icon-calendar-60

function DateFilter(props) {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button
      className="btn-round btn-icon"
      color="info"
      onClick={onClick}
      ref={ref}
    >
      <i className="tim-icons icon-calendar-60" />
    </Button>
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

{
  /* <button className="example-custom-input" onClick={onClick} ref={ref}>
{value}
</button> */
}

export default DateFilter;
