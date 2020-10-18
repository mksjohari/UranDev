import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import tab from "../../modules/header.module.scss";
import ProfileDetails from "./profileDetails";
import About from "./about";
import MyProjects from "../projects/myProjects";

const profile = React.memo((props) => {
    const [about, setAbout] = useState(true);
    return (
        <div className="parent">
            <ProfileDetails />
            <div className={`${tab.tabTop} ${tab.section}`}>
                <nav>
                    <ul className={tab.navList}>
                        <li>
                            <NavLink
                                activeClassName={tab.activeTabItem}
                                to="#"
                                isActive={() => about}
                                className={tab.navItem}
                                onClick={() => setAbout(true)}
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName={tab.activeTabItem}
                                to="#"
                                isActive={() => !about}
                                className={tab.navItem}
                                onClick={() => setAbout(false)}
                            >
                                Projects
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            {about ? <About /> : <MyProjects view="profile" />}
        </div>
    );
});

export default profile;
