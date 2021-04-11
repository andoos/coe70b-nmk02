import React, { useState, forwardRef } from "react";

import { Button, UncontrolledTooltip } from "reactstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./DateFilter.css";

function DateFilter(props) {
  const changeDate = (selectedDate) => {
    props.setSelectedDate(selectedDate);
    props.setRefresh(!props.refresh);
  };

  const [date, setDate] = useState(new Date());

  const DateFilterButton = forwardRef(({ onClick }, ref) => (
    <div id="dateFilter">
      <Button
        className="btn-round btn-icon"
        color="info"
        onClick={onClick}
        ref={ref}
      >
        <i className="tim-icons icon-calendar-60" />
      </Button>
      <UncontrolledTooltip placement="bottom" target="dateFilter">
        Filter Date
      </UncontrolledTooltip>
    </div>
  ));

  return (
    <div className="DateFilter">
      <DatePicker
        selected={date}
        onChange={(date) => {
          changeDate(date);
          setDate(date);
        }}
        customInput={<DateFilterButton />}
      />
    </div>
  );
}

export default DateFilter;
