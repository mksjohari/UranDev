import React, { useState } from "react";
import Button from "../../shared/sandbox/Button";
import styles from "../../modules/skillsTab.module.scss";

function SkillsTab() {
	const [showTab, setshowTab] = useState(true);
	return (
		<div className={styles.tab}>
			{showTab ? (
				<>
					<p className={styles.p}>Skills developed:</p>
					<span className={styles.skill}>Web Development</span>
					<span className={styles.skill}>High-fidelity Prototyping</span>
					<span className={styles.skill}>Frontend Development</span>
					<Button
						className='yellow'
						iconR={<i className='fas fa-check'></i>}
						text='Endorse a skill'
					/>

					<p className={styles.p}>Tools involved:</p>
					<span className={styles.tool}>Git</span>
					<span className={styles.tool}>Python</span>
					<span className={styles.tool}>Framer</span>
					<Button
						className='blue'
						iconR={<i className='fas fa-check'></i>}
						text='Endorse a tool'
					/>
				</>
			) : (
				""
			)}
			<div className={styles.hide_btn} onClick={() => setshowTab(!showTab)}>
				{showTab ? (
					<>
						<i class='fal fa-angle-double-up'></i>
						Hide
						<i class='fal fa-angle-double-up'></i>
					</>
				) : (
					<>
						<i class='fal fa-angle-double-down'></i>
						Endorse a Skill or a Tool
						<i class='fal fa-angle-double-down'></i>
					</>
				)}
			</div>
		</div>
	);
}

export default SkillsTab;