import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Button from './Button';
import SubjectOptions from './SubjectOptions';
import styles from '../../modules/tab.module.scss';

function FindProjects(props) {
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');

	return (
		<div className={`${styles.tab_panel} ${styles.transparent}`}>
			<input
				name="name"
				className={`inp-text search`}
				placeholder="Project name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Dropdown
				width={window.innerWidth * 0.2}
				colour="white"
				text="Field of study"
				options={SubjectOptions}
				value={category}
				onChange={(e) => setCategory(e)}
			/>
			<Button
				colour={props.view === 'profile' ? 'yellow' : 'pink'}
				iconL={<i className="fas fa-search" />}
				text="Search"
				onClick={() =>
					alert(`Submitting Form ${name + category.value}`)
				}
			/>
		</div>
	);
}

export default FindProjects;
