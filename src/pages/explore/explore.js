import React from 'react';

import JobSearch from '../../images/jobsearch.png';
import '../../modules/signUp.module.scss';
import 'react-step-progress-bar/styles.css';

const Explore = () => {
	return (
		<div>
			<h1>Welcome to URAN,</h1>
			<p style={{ fontSize: '16px' }}>Create your e-portfolio today!</p>
			<img className="jobsearch-img" src={JobSearch} alt="jobsearch" />
		</div>
	);
};

export default Explore;
