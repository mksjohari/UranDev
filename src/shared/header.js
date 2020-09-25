import React from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./modules/header.module.scss";
import Logo from "../images/logo.png";
import Button from "./Button";

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
                        <h1 className={styles.textLogo}>URAN</h1>
                    </Link>
                </div>
                <div className={styles.details}>
                    <Link className={styles.signUp} onClick={(props.handleShow()) (props.toSignUp())}>
                        Sign Up
                    </Link>
                    <Button colour="yellow" text="Sign In" onClick={(props.handleShow()) (props.toLogin())}/>
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
