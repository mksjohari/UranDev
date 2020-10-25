import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import Logout from "../shared/sandbox/Logout";

import styles from "../modules/header.module.scss";
import Logo from "../images/logo.png";
import Button from "./sandbox/Button";
import { getFirebase } from "./firebase/config";

const Header = (props) => {
    const [user, setUser] = useState();
    useEffect(() => {
        getFirebase()
            .auth()
            .onAuthStateChanged(function (user) {
                if (user) {
                    setUser(user);
                }
            });
    }, []);
    const history = useHistory();
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
                    {user && (
                        <div>
                            {/* <Logout /> */}
                            <Button
                                className={styles.signUp}
                                text="LogOut"
                                onClick={async () => {
                                    await getFirebase().auth().signOut();
                                    window.location.reload();
                                    history.push("/");
                                }}
                            />
                        </div>
                    )}
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

export default Header;
