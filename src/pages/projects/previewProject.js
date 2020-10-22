import React, { useState } from "react";
import styles from "../../modules/previewProject.module.scss";
import SkillsTab from "./skillsTab";
import JobSearch from "../../images/jobsearch.png";

function PreviewProject(props) {
	return (
		<div>
            <div className={styles.cover_div}>
			<img src={JobSearch}></img>
            </div>
			<SkillsTab />
			<div className={styles.situation_grid}>
				<div className={styles.summary_div}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse.
				</div>
				<div className={styles.stats_div}>
					<div className={styles.stats}>
						<i class='far fa-user' />
						&nbsp;Team Size
						<br />
						<p className={styles.details}>5</p>
					</div>
					<div className={styles.stats}>
						<i class='fas fa-dollar-sign' />
						&nbsp;Budget
						<br />
						<p className={styles.details}>100,000 AUD</p>
					</div>
					<div className={styles.stats}>
						<i class='far fa-clock' />
						&nbsp;Duration
						<br />
						<p className={styles.details}>9 yrs 1 m</p>
					</div>
				</div>
                <div className={styles.user_div}>
                    <img src={JobSearch} className={styles.profile_pic}></img>
                    <p className={styles.name}>John Doe</p>
                    <p className={styles.title}>Tech Consultant</p>
                </div>
			</div>
		</div>
	);
}

export default PreviewProject;
