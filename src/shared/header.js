import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from '../modules/header.module.scss';
import Logo from '../images/logo.png';
import Button from './sandbox/Button';
// import Logout from "../shared/sandbox/Logout";

const Header = (props) => {
	return (
		<header className={styles.header}>
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
					{/* <Logout /> */}
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
								Explore
							</NavLink>
						</li>
						<li>
							<NavLink
								activeClassName={styles.activeNavItem}
								className={styles.navItem}
								to="/profile"
							>
								My Profile
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
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
