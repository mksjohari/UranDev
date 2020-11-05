import React from 'react';
import { useField } from 'formik';
import styles from '../../modules/tab.module.scss';

function SegmentTab(props) {
	const [, meta, helpers] = useField(props.name);

	const { value } = meta;
	const { setValue } = helpers;

	const isSelected = (v) =>
		`${styles.role} ${v === value ? styles.role_active : ''}`;

	return (
		<div className={styles.segmented_tab}>
			<button
				type="button"
				className={isSelected(props.options[0])}
				onClick={() => setValue(props.options[0], false)}
			>
				{props.options[0]}
			</button>
			<button
				type="button"
				className={isSelected(props.options[1])}
				onClick={() => setValue(props.options[1], false)}
			>
				{props.options[1]}
			</button>
		</div>
	);
}

export default SegmentTab;
