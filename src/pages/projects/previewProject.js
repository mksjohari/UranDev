import React from "react";
import styles from "../../modules/previewproject.module.scss";
import SkillsTab from "./skillsTab";
import JobSearch from "../../images/jobsearch.png";

function PreviewProject(props) {
	return (
		<div>
			<div className={styles.cover_div}>
				<img src={JobSearch}></img>
				<div className={styles.banner}>
					<div className={styles.project_title}>{projectTitle}</div>
					<div>
						<i className='far fa-calendar' style={{margin: '10px'}} />
						{date}
					</div>
				</div>
			</div>
			<SkillsTab />
			<div className={styles.project_ctn}>
				<h1 className={styles.h1}>Situation</h1>
				<div className={styles.situation_grid}>
					<div className={styles.summary_div}>
						{desc}
					</div>
					<div className={styles.stats_div}>
						<div className={styles.stats}>
							<i className='far fa-user' />
							&nbsp;Team Size
							<br />
							<p className={styles.details}>{size}</p>
						</div>
						<div className={styles.stats}>
							<i className='fas fa-dollar-sign' />
							&nbsp;Budget
							<br />
							<p className={styles.details}>{budget}</p>
						</div>
						<div className={styles.stats}>
							<i className='far fa-clock' />
							&nbsp;Duration
							<br />
							<p className={styles.details}>{duration}</p>
						</div>
					</div>
					<div className={styles.user_div}>
						<img src={JobSearch} className={styles.profile_pic}></img>
						<p className={styles.name}>{name}</p>
						<p className={styles.title}>{title}</p>
					</div>
				</div>
				<h1 className={styles.h1}>Tasks & Actions</h1>

				<h1 className={styles.h1}>Results</h1>
				<i className='fas fa-link' />
				<p className={styles.result}>
					{desc}
				</p>
			</div>
		</div>
	);
}

export default PreviewProject;

const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.";
const size = '5';
const budget = '100,000 AUD';
const duration = '9 yrs 1 m';
const name = 'John Doe';
const title = 'Tech Consultant';
const date = '01/01/2011 - 20/02/2020';
const projectTitle = 'Project Title';