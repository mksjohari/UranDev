import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from '../../modules/header.module.scss';
import { getUserExpertise } from '../../shared/firebase/firebase';
import ProfileDetails from './userDetails';
import About from './about';
import MyProjects from '../projects/myProjects';
import { getFirebase } from '../../shared/firebase/config';

function mapStateToProps(state) {
	return { user: state.user };
}

const getDetails = async (uid, setDetails, setChecked) => {
	const userInfo = await getFirebase()
		.firestore()
		.collection('users')
		.doc(uid)
		.get();
	if (!userInfo.data) {
		setDetails({});
	} else {
		setDetails({
			firstName: userInfo.data().firstName,
			lastName: userInfo.data().lastName,
			photoUrl: userInfo.data().photoUrl,
			location: userInfo.data().location,
			occupation: userInfo.data().occupation,
			description: userInfo.data().description,
			social: userInfo.data().social,
			expertise: userInfo.data().expertise,
		});
	}
	setChecked(true);
};

const profile = React.memo((props) => {
	const [about, setAbout] = useState(true);
	const [checked, setChecked] = useState(false);
	const [details, setDetails] = useState({});
	const uid = props.match.params.uid;

	useEffect(() => {
		if (uid === props.user.uid) {
			console.log('ME');
			setDetails(props.user);
			setChecked(true);
		} else {
			console.log('NOT ME');

			getDetails(uid, setDetails, setChecked);
		}
	}, [props, uid]);
	if (checked === true && Object.keys(details).length !== 0) {
		return (
			<div>
				<ProfileDetails user={details} />
				<div className={`${styles.tabTop}`}>
					<NavLink
						activeClassName={styles.activeTabItem}
						to="#"
						isActive={() => about}
						className={styles.tabItem}
						onClick={() => setAbout(true)}
					>
						About
					</NavLink>

					<NavLink
						activeClassName={styles.activeTabItem}
						to="#"
						isActive={() => !about}
						className={styles.tabItem}
						onClick={() => setAbout(false)}
					>
						Projects
					</NavLink>
				</div>
				{about ? <About /> : <MyProjects view="profile" />}
			</div>
		);
	} else {
		return (
			<div>
				<h1>Loading / User Not Found</h1>
				<h3>Havent added conditions yet</h3>
			</div>
		);
	}
});

export default connect(mapStateToProps)(profile);
