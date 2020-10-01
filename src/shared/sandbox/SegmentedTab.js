import React, { useState } from 'react';
import styles from '../../modules/tab.module.scss';

function SegmentedTab() {
	const [role, setRole] = useState('Jobseeker');
	function setEmployer() {
		setRole('Employer');
	}
	function setJobseeker() {
		setRole('Jobseeker');
	}
	return (
		<div className={styles.segmented_tab}>
			<button
				className={`${styles.role} ${role === 'Jobseeker' ? 'active' : ''}`}
				onClick={setJobseeker}
			>
				I'm a <span>Jobseeker</span>
			</button>
			<button
				className={`${styles.role} ${role === 'Employer' ? 'active' : ''}`}
				onClick={setEmployer}
			>
				I'm an <span>Employer</span>
			</button>
		</div>
	);
}

export default SegmentedTab;
