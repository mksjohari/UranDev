import React from "react";
import styles from "../../modules/projectresult.module.scss";
import JobSearch from "../../images/jobsearch.png";

function ProjectResult(props) {
	return (
		<div className={styles.project_result}>
			<div className={styles.img_div}>
				<img className={styles.img} src={JobSearch} />
			</div>
			<div className={styles.title_div}>Project Name</div>
			<div className={styles.desc_div}>{truncate(desc)}</div>
			<div className={styles.details_div}>
				<i className='far fa-user' /> John Doe
                <br />
				<i className='far fa-calendar' /> 08/08/2018 - 09/09/2019
			</div>
		</div>
	);
}

export default ProjectResult;

const desc =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.";

const truncate = (str) => {
	return str.length > 225 ? str.substring(0, 225) + "..." : str;
};
