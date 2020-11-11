import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import styles from '../modules/header.module.scss';
import Logo from '../images/logo.svg';
import Button from './sandbox/Button';
import { getFirebase } from './firebase/config';
import { logoutUser } from '../actions/userAction';
import DevButton from './sandbox/devButton';
import Menu from './Menu';

function mapStateToProps(state) {
	return { user: state.user };
}

const Header = (props) => {
	const [user, setUser] = useState();
	const [open, setOpen] = useState(false);
	useEffect(() => {
		if (props.user.uuid === '') {
			// check if logged, then call data
			getFirebase().auth().signOut();
			setUser(null);
		} else {
			setUser(props.user);
		}
	}, [props.user]);
	return (
		<header className={styles.header}>
			<DevButton
				text="test Redux"
				onClick={() => {
					console.log(props.user);
				}}
			/>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<Link className={styles.headerLink} to="/">
						<img
							className={styles.imageLogo}
							src={Logo}
							alt="Uran Logo ..."
						/>
						<div className={styles.uran}>URAN</div>
					</Link>
					<label id={styles.label} onClick={() => setOpen(!open)}>
						<div id={styles.nav_icon}>
							<span
								className={`${open ? styles.open1 : ''} ${
									styles.nav_icon1
								} `}
							/>
							<span
								className={`${open ? styles.open2 : ''} ${
									styles.nav_icon2
								} `}
							/>
							<span
								className={`${open ? styles.open3 : ''} ${
									styles.nav_icon3
								} `}
							/>
							<span
								className={`${open ? styles.open4 : ''} ${
									styles.nav_icon4
								} `}
							/>
						</div>
					</label>
				</div>
				<div className={styles.navContainer}>
					<input
						type="checkbox"
						className={styles.toggle}
						id="toggle"
					/>
					<nav className={styles.navBar}>
						<NavLink
							activeClassName={styles.activeNavItem}
							className={styles.navItem}
							exact
							to="/"
						>
							Home
						</NavLink>
						<NavLink
							activeClassName={styles.activeNavItem}
							className={styles.navItem}
							exact
							to="/explore"
						>
							Explore
						</NavLink>
						<NavLink
							activeClassName={styles.activeNavItem}
							className={styles.navItem}
							to="/tmp"
						>
							HY's Wall of Shame
						</NavLink>
						{user && <Menu />}
						{!user && (
							<div className={styles.buttons}>
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
					</nav>
				</div>
			</div>
		</header>
	);
};

export default connect(mapStateToProps, { logoutUser })(Header);
