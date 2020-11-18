import React from 'react';
import WordBubble from './wordBubble';
import Button from '../../shared/sandbox/Button';
import SkillToolProgress from './skillToolProgress';
import styles from '../../modules/profile.module.scss';

const test = [
	{ label: 'CRM', value: 1 },
	{ label: 'API', value: 1 },
	{ label: 'Data', value: 1 },
	{ label: 'Commerce', value: 1 },
	{ label: 'AI', value: 3 },
	{ label: 'Management', value: 5 },
	{ label: 'Testing', value: 6 },
	{ label: 'Mobile', value: 9 },
	{ label: 'Conversion', value: 9 },
	{ label: 'Misc', value: 21 },
	{ label: 'Databases', value: 22 },
	{ label: 'DevOps', value: 22 },
	{ label: 'Javascript', value: 23 },
	{ label: 'Languages/ Frameworks', value: 25 },
	{ label: 'Front End', value: 26 },
	{ label: 'Content', value: 50 },
];

const test2 = [
	{ label: 'CRM', value: 1 },
	{ label: 'API', value: 1 },
	{ label: 'Data', value: 1 },
	{ label: 'Commerce', value: 1 },
	{ label: 'AI', value: 3 },
	{ label: 'Management', value: 5 },
	{ label: 'Testing', value: 6 },
	{ label: 'Mobile', value: 9 },
	{ label: 'Conversion', value: 9 },
	{ label: 'Misc', value: 21 },
	{ label: 'Databases', value: 22 },
	{ label: 'DevOps', value: 22 },
	{ label: 'Javascript', value: 23 },
	{ label: 'Languages/ Frameworks', value: 25 },
	{ label: 'Front/ End', value: 26 },
	{ label: 'Skill Content', value: 50 },
];
const sorted = test.sort((a, b) => b.value - a.value);

function About(props) {
	return (
		<div className={styles.about}>
			<div className={styles.large_section}>
				<div className={styles.text_heading}>
					<i className="far fa-user fa-2x"></i>
					<h2
						className={`${styles.text_detail} ${styles.text_title}`}
					>
						Biography
					</h2>
				</div>
				<div>
					Longer description ayyyyyyy, Lorem ipsum dolor sit amet,
					consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi
					ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esseLonger description
					ayyyyyyy, Lorem ipsum dolor sit amet, consectetur adipiscing
					elit, sed do eiusmod tempor incididunt ut labore et dolore
					magna aliqua. Ut enim ad minim veniam, quis nostrud
					exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat. Duis aute irure dolor in reprehenderit in
					voluptate velit esse
					<br />
					<br />
					Longer description ayyyyyyy, Lorem ipsum dolor sit amet,
					consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi
					ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse
				</div>
			</div>
			<div className={styles.large_section}>
				<div className={styles.heading_endorse}>
					<div className={styles.text_heading}>
						<i className="far fa-star fa-2x"></i>
						<h2
							className={`${styles.text_detail} ${styles.text_title}`}
						>
							Skills
						</h2>
					</div>
					<div className={styles.endorse_button}>
						<Button
							className={styles.endorse_skill}
							iconR={<i className="fas fa-check"></i>}
							text="Endorse a skill"
						/>
					</div>
				</div>
				<div className={styles.column_section}>
					<WordBubble type="skill" data={test2} />
					<div className={styles.bar_section}>
						{sorted.map((item, index) => (
							<SkillToolProgress
								key={index}
								type="skill"
								item={item}
							/>
						))}
					</div>
				</div>
			</div>
			<div className={styles.large_section}>
				<div className={styles.heading_endorse}>
					<div className={styles.text_heading}>
						<i className="fas fa-wrench fa-2x"></i>
						<h2
							className={`${styles.text_detail} ${styles.text_title}`}
						>
							Tools
						</h2>
					</div>
					<div className={styles.endorse_button}>
						<Button
							className={styles.endorse_tool}
							iconR={<i className="fas fa-check"></i>}
							text="Endorse a tool"
						/>
					</div>
				</div>
				<div className={styles.column_section}>
					<WordBubble type="tool" data={test} />
					<div className={styles.bar_section}>
						{sorted.map((item, index) => (
							<SkillToolProgress
								key={index}
								type="tool"
								item={item}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
