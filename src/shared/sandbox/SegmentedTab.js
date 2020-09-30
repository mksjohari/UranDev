import React, { useState } from 'react';
import '../../modules/tab.scss';

function SegmentedTab() {
	const [role, setRole] = useState('Jobseeker');
	function setEmployer() {
		setRole('Employer');
	}
	function setJobseeker() {
		setRole('Jobseeker');
	}
	return (
		<div className="segmented-tab">
			<button
				className={`role ${role === 'Jobseeker' ? 'active' : ''}`}
				onClick={setJobseeker}
			>
				I'm a <span>Jobseeker</span>
			</button>
			<button
				className={`role ${role === 'Employer' ? 'active' : ''}`}
				onClick={setEmployer}
			>
				I'm an <span>Employer</span>
			</button>
		</div>
	);
}

export default SegmentedTab;
