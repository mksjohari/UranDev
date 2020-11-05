import React from 'react';
import { useField } from 'formik';
import styles from '../../modules/createProject.module.scss';
import Dropdown from '../sandbox/Dropdown';

const CurrencyOptions = [
	{ value: 'AUD', label: 'AUD' },
	{ value: 'CAD', label: 'CAD' },
	{ value: 'GBP', label: 'GBP' },
	{ value: 'USD', label: 'USD' },
];

function Currency(props) {
	const [, meta, helpers] = useField(props.name);

	const { value } = meta;
	const { setValue } = helpers;

	return (
		<div className={styles.dropdown_currency}>
			<Dropdown
				colour="white"
				width="150px"
				text="Currency"
				value={value}
				onChange={(e) => setValue(e, false)}
				options={CurrencyOptions}
			/>
		</div>
	);
}
export default Currency;
