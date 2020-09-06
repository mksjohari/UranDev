import React from "react";
import { Link } from "gatsby";

import styles from "./modules/header.module.scss";
import Logo from "../../static/logo.png";

const Header = () => {
    return (
        <header className={styles.header}>
            <Link className={styles.title} to="/">
                <img
                    className={styles.imageLogo}
                    src={Logo}
                    alt="Uran Logo ..."
                />
                <span>URAN</span>
            </Link>
            <div className={styles.navContainer}>
                <nav>
                    <ul className={styles.navList}>
                        <li>
                            <Link
                                activeClassName={styles.activeNavItem}
                                className={styles.navItem}
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                activeClassName={styles.activeNavItem}
                                className={styles.navItem}
                                to="/blog"
                            >
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                activeClassName={styles.activeNavItem}
                                className={styles.navItem}
                                to="/about"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                activeClassName={styles.activeNavItem}
                                className={styles.navItem}
                                to="/contact"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
