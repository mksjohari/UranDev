import React, { useState } from 'react';
import Dropdown from '../../shared/sandbox/Dropdown';
import Button from '../../shared/sandbox/Button';
import SubjectOptions from '../../shared/sandbox/SubjectOptions';
import styles from '../../modules/tab.module.scss';

function Tab(props) {
	const [tabOne, setTabOne] = useState(true);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [expertise, setExpertise] = useState('');
	const [skill, setSkill] = useState('');
	const [tool, setTool] = useState('');

	function handleToggle() {
		setTabOne(!tabOne);
	}

	function onHandleSubmit(e) {
		e.preventDefault();
		if (tabOne) {
			props.filterSearch(tabOne, {
				firstName,
				lastName,
				expertise: expertise.value,
			});
		} else {
			props.filterSearch(tabOne, {
				skill,
				tool,
			});
		}
	}
	return (
		<div>
			<div className={styles.tab_div}>
				<div className={styles.tab_list}>
					<button
						className={`${styles.tab} ${
							tabOne ? styles.tab_active : ''
						}`}
						onClick={tabOne ? null : handleToggle}
					>
						Find a candidate
					</button>
					<button
						className={`${styles.tab} ${
							tabOne ? '' : styles.tab_active
						}`}
						onClick={tabOne ? handleToggle : null}
					>
						Find a project
					</button>
				</div>
				{tabOne ? (
					<form onSubmit={onHandleSubmit}>
						<div className={styles.tab_panel}>
							<input
								name="firstname"
								className={`${styles.inp_text} ${styles.search}`}
								placeholder="firstname"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
							<input
								name="lastname"
								className={`${styles.inp_text} ${styles.search}`}
								placeholder="lastname"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
							<Dropdown
								width="200px"
								colour="white"
								text="Expertise"
								options={SubjectOptions}
								value={expertise}
								onChange={(e) => setExpertise(e)}
							/>
							<Button
								type="submit"
								colour="blue"
								iconL={<i className="fas fa-search" />}
								text="Search"
							/>
						</div>
					</form>
				) : (
					<form onSubmit={onHandleSubmit}>
						<div className={styles.tab_panel}>
							<input
								name="skill"
								className={`${styles.inp_text} ${styles.search}`}
								placeholder="skill"
								value={skill}
								onChange={(e) => setSkill(e.target.value)}
							/>
							<input
								name="tool"
								className={`${styles.inp_text} ${styles.search}`}
								placeholder="tool"
								value={tool}
								onChange={(e) => setTool(e.target.value)}
							/>
							<Button
								type="submit"
								colour="pink"
								iconL={<i className="fas fa-search" />}
								text="Search"
							/>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}

export default Tab;
