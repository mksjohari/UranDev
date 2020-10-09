import React from 'react';
import styles from '../../modules/tab.module.scss';

function SegmentedTab(props) {
	function setEmployer() {
		props.setStepOne({
			...props.stepOne,
			role: 'Employer',
		});
	}
	function setJobseeker() {
		props.setStepOne({
			...props.stepOne,
			role: 'Jobseeker',
		});
	}
	return (
		<div className={styles.segmented_tab}>
			<button
				className={`${styles.role} ${
					props.role === 'Jobseeker' ? styles.active : ''
				}`}
				onClick={setJobseeker}
			>
				I'm a <span>Jobseeker</span>
			</button>
			<button
				className={`${styles.role} ${
					props.role === 'Employer' ? styles.active : ''
				}`}
				onClick={setEmployer}
			>
				I'm an <span>Employer</span>
			</button>
		</div>
	);
}

export default SegmentedTab;
