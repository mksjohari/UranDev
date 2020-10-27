import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import styles from '../modules/header.module.scss';
import Logo from '../images/logo.png';
import Button from './sandbox/Button';
import { getFirebase } from './firebase/config';
import { logoutUser } from '../actions/userAction';
import DevButton from './sandbox/devButton';
import Menu from './Menu';
import { testFirestore } from './firebase/firebase';

function mapStateToProps(state) {
	return { user: state.user };
}

const Header = (props) => {
	const [user, setUser] = useState();
	useEffect(() => {
		getFirebase()
			.auth()
			.onAuthStateChanged(function (user) {
				if (user) {
					setUser(user);
				}
				if (!props.user) {
					getFirebase().auth().logOut();
					setUser();
				}
			});
	}, [props.user]);
	return (
		<header className={styles.header}>
			<DevButton
				onClick={() => {
					testFirestore(props.user.uid);
				}}
			/>
			<div className={styles.logoAndDetails}>
				<div className={styles.logo}>
					<Link className={styles.headerLink} to="/">
						<img
							className={styles.imageLogo}
							src={Logo}
							alt="Uran Logo ..."
						/>
					</Link>
				</div>
				<div className={styles.details}>
					{user && <Menu />}
					{!user && (
						<div>
							<Button
								className={styles.signUp}
								text="Sign Up"
								onClick={props.toSignUp}
							/>
							<Button
								colour="yellow"
								text="Sign In"
								onClick={props.toLogin}
							/>
						</div>
					)}
				</div>
			</div>
			<div className={styles.navContainer}>
				<nav>
					<ul className={styles.navList}>
						<li>
							<NavLink
								activeClassName={styles.activeNavItem}
								className={styles.navItem}
								exact
								to="/"
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								activeClassName={styles.activeNavItem}
								className={styles.navItem}
								exact
								to="/explore"
							>
								Explore
							</NavLink>
						</li>
						<li>
							<NavLink
								activeClassName={styles.activeNavItem}
								className={styles.navItem}
								to="/projects"
							>
								Manage Projects
							</NavLink>
						</li>
						<li>
							<NavLink
								activeClassName={styles.activeNavItem}
								className={styles.navItem}
								to="/tmp"
							>
								HY's Wall of Shame
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default connect(mapStateToProps, { logoutUser })(Header);
