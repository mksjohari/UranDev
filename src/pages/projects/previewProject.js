import React from 'react';
import styles from '../../modules/previewProject.module.scss';
import JobSearch from '../../images/jobsearch.png';

function PreviewProject(props) {
	const situation = props.project.situation;
	const results = props.project.results;
	return (
		<div>
			<div className={styles.cover_div}>
				<img src={JobSearch} alt="jobsearch"></img>
				<div className={styles.banner}>
					<div className={styles.project_title}>{projectTitle}</div>
					<div>
						<i
							className="far fa-calendar"
							style={{ margin: '10px' }}
						/>
						{`${situation.projectDates.startDate} - ${situation.projectDates.endDate}`}
					</div>
				</div>
			</div>
			{/* <SkillsTab /> */}
			<div className={styles.project_ctn}>
				<h1 className={styles.h1}>Situation</h1>
				<div className={styles.situation_grid}>
					<div className={styles.summary_div}>
						{situation.summary}
					</div>
					<div className={styles.stats_div}>
						<div className={styles.stats}>
							<i className="far fa-user" />
							&nbsp;Team Size
							<br />
							<p className={styles.details}>
								{situation.teamSize}
							</p>
						</div>
						<div className={styles.stats}>
							<i className="fas fa-dollar-sign" />
							&nbsp;Budget
							<br />
							<p
								className={styles.details}
							>{`${situation.budget} ${situation.currency}`}</p>
						</div>
						<div className={styles.stats}>
							<i className="far fa-clock" />
							&nbsp;Duration
							<br />
							<p className={styles.details}>{duration}</p>
						</div>
					</div>
					<div className={styles.user_div}>
						<img
							src={JobSearch}
							alt="jobsearch"
							className={styles.profile_pic}
						></img>
						<p className={styles.name}>{name}</p>
						<p className={styles.title}>{situation.role}</p>
					</div>
				</div>
				{/* <h1 className={styles.h1}>Tasks & Actions</h1> */}

				<h1 className={styles.h1}>Results</h1>
				<i className="fas fa-link" />
				<p className={styles.result}>{results.conclusion}</p>
			</div>
		</div>
	);
}

export default PreviewProject;

// const desc =
// 	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.';
// const size = '5';
// const budget = '100,000 AUD';
// const title = 'Tech Consultant';
// const date = '01/01/2011 - 20/02/2020';
const projectTitle = 'Project Title';
const duration = '9 yrs 1 m';
const name = 'John Doe';
