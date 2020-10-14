import React, {useState} from 'react';
import { useField } from "formik";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '../../modules/react_dates_overrides.css'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

function DateSelect (props){
  const [field, meta, helpers] = useField(props.name);
  const [focus, setFocus] = useState("startDate");

  
  const { value } = meta;
  const { setValue } = helpers;
  // const [startDate, setStartDate] = useState(value.startDate);
  
    return(
      <>
      {console.log(meta, value)}
        <DateRangePicker
          startDate={value.startDate} // momentPropTypes.momentObj or null,
          startDateId={props.taskId + "_startDate"} // PropTypes.string.isRequired,
          endDate={value.endDate} // momentPropTypes.momentObj or null,
          endDateId={props.taskId + "_endDate"} // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => setValue({ startDate: startDate, endDate: endDate }, false)} // PropTypes.func.isRequired,
          focusedInput={focus} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => setFocus(focusedInput)} // PropTypes.func.isRequired,
          disableScroll={true}
          showClearDates
          reopenPickerOnClearDates
          customInputIcon={<i className={`fas fa-calendar`} ></i>}
          small
          minimumNights={0}
          isOutsideRange={() => false}
        />
      </>
    );
}

export default DateSelect;
