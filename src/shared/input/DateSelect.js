import React, { useState } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '../../modules/react_dates_overrides.css';
import { DateRangePicker } from 'react-dates';

function DateSelect(props) {
	const [focus, setFocus] = useState(null);
	return (
		<>
			<DateRangePicker
				startDate={props.value.startDate} // momentPropTypes.momentObj or null,
				startDateId={props.id + '_startDate'} // PropTypes.string.isRequired,
				endDate={props.value.endDate} // momentPropTypes.momentObj or null,
				endDateId={props.id + '_endDate'} // PropTypes.string.isRequired,
				onDatesChange={({ startDate, endDate }) =>
					props.handleClick({ startDate, endDate })
				} // PropTypes.func.isRequired,
				focusedInput={focus} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
				onFocusChange={(focusedInput) => {
					// props.isSubmittable &&
					//     focusedInput === null &&
					//     props.onSubmit();
					setFocus(focusedInput);
				}} // PropTypes.func.isRequired,
				// disableScroll={true}
				disabled={props.disabled}
				showClearDates={!props.disabled}
				reopenPickerOnClearDates
				customInputIcon={<i className={`fas fa-calendar`}></i>}
				small
				minimumNights={0}
				isOutsideRange={() => false}
			/>
		</>
	);
}

export default DateSelect;
