import React, { useState, useEffect } from 'react';

import JobSearch from '../../images/jobsearch.png';
import Tab from './Tab';
import Checkbox from '../../shared/sandbox/Checkbox';
import '../../modules/signUp.module.scss';
import 'react-step-progress-bar/styles.css';
import styles from '../../modules/explore.module.scss';
import SearchResult from './SearchResult';
import { getExploreUsers } from '../../shared/firebase/firebase';

const getUsers = async (setUsers) => {
	const results = await getExploreUsers();
	setUsers(results.data);
	return results;
};

const Explore = (props) => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		getUsers(setUsers);
	}, []);
	return (
		<div>
			<Tab />
			<div className={styles.container}>
				<div className={styles.filter}>
					<strong>Sort by:</strong>
					<br />
					<Checkbox id="1" label="Most endorsed" />
					<Checkbox id="2" label="Most recent" />
					<Checkbox id="3" label="Most relevant" />
					<Checkbox id="4" label="Most projects" />
					<Checkbox id="5" label="Most experienced" />
				</div>
				<div className={styles.results}>
					<h6 className={styles.h6}>
						Search results ({users.length})
					</h6>
					{users.map((user, index) => {
						return (
							<SearchResult
								key={index}
								pid={user.pid}
								name={`${user.firstName} ${user.lastName}`}
								location={user.location}
								occupation={user.occupation}
								photoUrl={user.photo}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Explore;
