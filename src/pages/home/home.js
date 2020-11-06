import React from "react";

import JobSearch from "../../images/jobsearch.svg";
import Skills from "../../images/skills.svg";
import FindJob from "../../images/findjob.svg";
import Network from "../../images/network.svg";
import "../../modules/signUp.module.scss";
import "react-step-progress-bar/styles.css";
import styles from "../../modules/home.module.scss";
import Button from "../../shared/sandbox/Button";

const Home = (props) => {
	return (
		<div className={styles.body}>
			<div className={styles.hero}>
                <div className={styles.column}>
                <h1>Welcome to URAN!</h1>
				<p style={{ fontSize: "16px" }}>Create your e-portfolio today!</p>
                <Button className="blue" text="Get started" />
                </div>
					<img
						className={styles.jobsearch_img}
						src={JobSearch}
						alt='jobsearch'
					/>
			</div>
			<section className={styles.section}>
				<div className={styles.card}>
					<img className={styles.card_img} src={Skills} alt='skills' />
					<h5 className={styles.h5}>
						Show off your skills and past experiences
					</h5>
					<p className={styles.desc}>
						Gain credentials and recognition for the skills that you have
						through recording your past experiences.
					</p>
					<Button className='blue' text='Get started' />
				</div>
				<div className={styles.card}>
                    <img className={styles.card_img} src={Network} alt='network' />
					<h5 className={styles.h5}>Connect with hiring managers</h5>
					<p className={styles.desc}>
						Get in contact with hiring managers in the industry to boost your
						chances of getting hired.
					</p>
					<Button className='pink' text='Get started' />
				</div>
				<div className={styles.card}>
                    <img className={styles.card_img} src={FindJob} alt='findjob' />
					<h5 className={styles.h5}>Search for suitable candidates</h5>
					<p className={styles.desc}>
						If you're looking for employees for a specific role, find the
						best-suited candidate on URAN.
					</p>
					<Button className='yellow' text='Get started' />
				</div>
			</section>
		</div>
	);
};

export default Home;
