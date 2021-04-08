import React, { useState, forwardRef } from "react";

import { Button, UncontrolledTooltip } from "reactstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import DateFilterStyles from "./DateFilter.module.css";

function DateFilter(props) {
  const changeDate = (selectedDate) => {
    props.setSelectedDate(selectedDate);
    props.setRefresh(!props.refresh);
  };

  const [startDate, setStartDate] = useState(new Date());

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
    <div className={DateFilterStyles.DateFilter}>
      <DatePicker
        selectedDate={startDate}
        onChange={(date) => {
          changeDate(date);
          setStartDate(date);
        }}
        customInput={<DateFilterButton />}
      />
    </div>
  );
}

export default DateFilter;
