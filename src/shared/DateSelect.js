import React from 'react';
//import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
//import aphroditeInterface from 'react-with-styles-interface-aphrodite';
//import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '../modules/react_dates_overrides.css'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

// ThemedStyleSheet.registerInterface(aphroditeInterface);
// ThemedStyleSheet.registerTheme({
//   reactDates: {
//     ...DefaultTheme.reactDates,
//     color: {
//       ...DefaultTheme.reactDates.color,
//       highlighted: {
//         backgroundColor: 'lightblue',
//         backgroundColor_active: 'lightblue',
//         backgroundColor_hover: 'lightblue',
//         color: 'lightblue',
//         color_active: 'lightblue',
//         color_hover: 'lightblue',
//       },
//     },
//   },
// });

class DateSelect extends React.Component {
  state = {};
  
  render() {
    return(
      <>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId={this.props.taskId + "_startDate"} // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId={this.props.taskId + "_endDate"} // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          disableScroll={true}
          showClearDates
          reopenPickerOnClearDates
          customInputIcon={<i className={`fas fa-calendar`} ></i>}
          small
          minimumNights={0}
          isOutsideRange={() => false}
        />
      </>
    )
  }
}

export default DateSelect;
