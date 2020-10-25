import React from "react";

import JobSearch from "../../images/jobsearch.png";
import Tab from "../../shared/sandbox/Tab";
import Checkbox from "../../shared/Checkbox";
import "../../modules/signUp.module.scss";
import "react-step-progress-bar/styles.css";
import styles from "../../modules/explore.module.scss";
import SearchResult from "../../shared/sandbox/SearchResult";
import ProjectResult from "../../shared/sandbox/ProjectResult";

const Explore = (props) => {
	console.log(props);
	return (
		<div>
			<h1>Welcome to URAN,</h1>
			<p style={{ fontSize: "16px" }}>Create your e-portfolio today!</p>
			<div className={styles.imgctn}>
				<img className={styles.jobsearch_img} src={JobSearch} alt='jobsearch' />
			</div>
			<Tab />
			<div className={styles.container}>
				<div className={styles.filter}>
					<strong>Sort by:</strong>
					<br />
					<Checkbox id='1' label='Most endorsed' />
					<Checkbox id='2' label='Most recent' />
					<Checkbox id='3' label='Most relevant' />
					<Checkbox id='4' label='Most projects' />
					<Checkbox id='5' label='Most experienced' />
				</div>
				<div className={styles.results}>
					<h6 className={styles.h6}>Search results (4)</h6>
					<ProjectResult />
					<SearchResult
						name='John Doe'
						location='Melbourne, AU'
						userType='Graduate'
					/>
					<SearchResult
						name='Jane Doe'
						location='Sydney, AU'
						userType='Freelancer'
					/>
					<SearchResult
						name='James Doe'
						location='New York, US'
						userType='Researcher'
					/>
				</div>
			</div>
		</div>
	);
};

export default Explore;
