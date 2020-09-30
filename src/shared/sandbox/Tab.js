import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Button from './Button';
import SubjectOptions from './SubjectOptions';
import SkillOptions from './SkillOptions';
import '../modules/tab.scss';

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
		<div className="tab-div">
			<div className="tab-list">
				<button
					className={`tab ${tabOne ? 'active' : ''}`}
					onClick={tabOne ? null : handleToggle}
				>
					Find a candidate
				</button>
				<button
					className={`tab ${tabOne ? '' : 'active'}`}
					onClick={tabOne ? handleToggle : null}
				>
					Find a project
				</button>
			</div>
			{tabOne ? (
				<div className="tab-panel">
					<input
						name="name"
						className="inp-text search"
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
						className="inp-text search"
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
				<div className="tab-panel">
					<input
						name="code"
						className="inp-text search"
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
