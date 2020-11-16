import React, { useState } from 'react';
import Button from '../../shared/sandbox/Button';
import styles from '../../modules/skillsTab.module.scss';

function SkillsTab() {
	const [showTab, setshowTab] = useState(true);
	return (
		<div className={styles.tab}>
			{showTab ? (
				<div className={styles.container}>
					<div className={styles.skills_div}>
						<p className={styles.p}>Skills developed:</p>
						{skills.map((skill, index) => (
							<span key={index} className={styles.skill}>
								{skill}
							</span>
						))}
					</div>
					<div className={styles.skills_btn}>
						<Button
							className="yellow"
							iconR={<i className="fas fa-check"></i>}
							text="Endorse a skill"
						/>
					</div>
					<div className={styles.tools_div}>
						<p className={styles.p}>Tools involved:</p>
						{tools.map((tool, index) => (
							<span key={index} className={styles.tool}>
								{tool}
							</span>
						))}
					</div>
					<div className={styles.tools_btn}>
						<Button
							className="blue"
							iconR={<i className="fas fa-check"></i>}
							text="Endorse a tool"
						/>
					</div>
				</div>
			) : (
				''
			)}
			<div
				className={styles.hide_btn}
				onClick={() => setshowTab(!showTab)}
			>
				{showTab ? (
					<>
						<i className="fal fa-angle-double-up"></i>
						Hide
						<i className="fal fa-angle-double-up"></i>
					</>
				) : (
					<>
						<i className="fal fa-angle-double-down"></i>
						Endorse a Skill or a Tool
						<i className="fal fa-angle-double-down"></i>
					</>
				)}
			</div>
		</div>
	);
}

export default SkillsTab;

const skills = [
	'Web Development',
	'High-fidelity Prototyping',
	'Frontend Development',
];
const tools = ['Git', 'Python', 'Framer'];
