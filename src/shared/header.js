import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import styles from "../modules/header.module.scss";
import Logo from "../images/logo.svg";
import Button from "./sandbox/Button";
import { getFirebase } from "./firebase/config";
import { logoutUser } from "../actions/userAction";
import DevButton from "./sandbox/devButton";
import Menu from "./Menu";

function mapStateToProps(state) {
	return { user: state.user };
}

const Header = (props) => {
	const [user, setUser] = useState();
	useEffect(() => {
		if (props.user.uuid === "") {
			// check if logged, then call data
			getFirebase().auth().signOut();
			setUser(null);
		} else {
			setUser(props.user);
		}
	}, [props.user]);
	console.log(user);
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<Link className={styles.headerLink} to='/'>
						<img className={styles.imageLogo} src={Logo} alt='Uran Logo ...' />
						<div className={styles.uran}>URAN</div>
					</Link>
					<label for='toggle' id={styles.label}>
						<i className='fas fa-bars' />
					</label>
				</div>
				<div className={styles.navContainer}>
					<input type='checkbox' className={styles.toggle} id='toggle' />
					<nav className={styles.navBar}>
						<NavLink
							activeClassName={styles.activeNavItem}
							className={styles.navItem}
							exact
							to='/'
						>
							Home
						</NavLink>
						<NavLink
							activeClassName={styles.activeNavItem}
							className={styles.navItem}
							exact
							to='/explore'
						>
							Explore
						</NavLink>
						<NavLink
							activeClassName={styles.activeNavItem}
							className={styles.navItem}
							to='/tmp'
						>
							HY's Wall of Shame
						</NavLink>
						{user && <Menu />}
						{!user && (
							<div className={styles.buttons}>
								<Button
									className={styles.signUp}
									text='Sign Up'
									onClick={props.toSignUp}
								/>
								<Button
									colour='yellow'
									text='Sign In'
									onClick={props.toLogin}
								/>
								<DevButton
									onClick={() => {
										console.log();
										console.log(props.user);
									}}
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
