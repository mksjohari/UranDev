import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { getFirebase } from './firebase/config';
import { logoutUser } from '../actions/userAction';
import { useHistory } from 'react-router-dom';

import styles from '../modules/logout.module.scss';
import { Settings, LogOut, ChevronDown, User } from 'react-feather';

function mapStateToProps(state) {
	return { user: state.user };
}

const logout = async (logoutUser, history) => {
	await getFirebase().auth().signOut();
	logoutUser();
	history.push('/');
};

const goProfile = async (user, history) => {
	history.push(`/users/${user.uid}`);
};
const goProjects = async (user, history) => {
	history.push(`/users/${user.uid}/projects`);
};

function Menu(props) {
	const node = useRef();
	const [open, setOpen] = useState(false);
	const user = props.user;
	const displayName = `${user.firstName} ${user.lastName}`;
	const history = useHistory();
	const handleClick = (e) => {
		if (node.current.contains(e.target)) {
			//handle click
			return;
		}
		setOpen(false);
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);
	return (
		<div ref={node} className={styles.logout}>
			<div className={styles.logout_btn} onClick={() => setOpen(!open)}>
				
					<img
						className={styles.profile_pic}
						src={user.photoUrl}
						alt="profile"
					/>
				
				<p className={styles.name}>{displayName}</p>
				<ChevronDown size="20px" />
			</div>
			<div
				className={open ? styles.menu_show : styles.menu_hide}
				onClick={() => setOpen(false)}
			>
				<p
					className={styles.option}
					onClick={() => {
						goProfile(user, history);
					}}
				>
					<User className={styles.settings_icon} />
					Profile
				</p>
				{/* <p
					className={styles.option}
					onClick={() => {
						goProjects(user, history);
					}}
				>
					<User className={styles.settings_icon} />
					Projects
				</p> */}
				<p className={styles.option}>
					<Settings className={styles.settings_icon} />
					Account settings
				</p>
				<p
					className={styles.option}
					onClick={() => {
						console.log('lgging out');
						logout(props.logoutUser, history);
					}}
				>
					<LogOut className={styles.logout_icon} />
					Log out
				</p>
			</div>
		</div>
	);
}

export default connect(mapStateToProps, { logoutUser })(Menu);
