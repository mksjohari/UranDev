import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './modules/header.module.scss';
import Logo from '../images/logo.png';

const Header = () => {
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
						<h1 className={styles.textLogo}>URAN</h1>
					</Link>
				</div>
				<div className={styles.details}>
					<div className={styles.signUp}>Sign Up</div>
					<div className={styles.login}>Login</div>
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
								to="/explore"
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
