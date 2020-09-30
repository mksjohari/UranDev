import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Button from './Button';
import SubjectOptions from './SubjectOptions';
import SkillOptions from './SkillOptions';
import styles from '../../modules/tab.module.scss';

function Tab() {
	const [tabOne, setTabOne] = useState(true);
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [location, setLocation] = useState('');
	const [code, setCode] = useState('');
	const [skill, setSkill] = useState('');

	function handleToggle() {
		setTabOne(!tabOne);
	}
	return (
		<div className={styles.tab_div}>
			<div className={styles.tab_list}>
				<button
					className={`${styles.tab} ${tabOne ? 'active' : ''}`}
					onClick={tabOne ? null : handleToggle}
				>
					Find a candidate
				</button>
				<button
					className={`${styles.tab} ${tabOne ? '' : 'active'}`}
					onClick={tabOne ? handleToggle : null}
				>
					Find a project
				</button>
			</div>
			{tabOne ? (
				<div className={styles.tab_panel}>
					<input
						name="name"
						className={`${styles.inp_text} ${styles.search}`}
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Dropdown
						width="200px"
						colour="white"
						text="Field of study"
						options={SubjectOptions}
						value={category}
						onChange={(e) => setCategory(e)}
					/>
					<input
						name="location"
						className={`${styles.inp_text} ${styles.search}`}
						placeholder="Location"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
					<Button
						colour="blue"
						iconL={<i className="fas fa-search" />}
						text="Search"
						onClick={() =>
							alert(
								`Submitting Form ${
									name + location + category.value
								}`
							)
						}
					/>
				</div>
			) : (
				<div className={styles.tab_panel}>
					<input
						name="code"
						className={`${styles.inp_text} ${styles.search}`}
						placeholder="Project code"
						value={code}
						onChange={(e) => setCode(e.target.value)}
					/>
					<Dropdown
						width="450px"
						colour="white"
						text="Skill"
						options={SkillOptions}
						isMulti={true}
						value={skill}
						onChange={(e) => setSkill(e)}
					/>
					<Button
						colour="pink"
						iconL={<i className="fas fa-search" />}
						text="Search"
						onClick={() => alert(`Submitting Form ${code + skill}`)}
					/>
				</div>
			)}
		</div>
	);
}

export default Tab;
