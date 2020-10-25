import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import tab from "../../modules/header.module.scss";
import ProfileDetails from "./profileDetails";
import About from "./about";
import MyProjects from "../projects/myProjects";

function mapStateToProps(state) {
    return { user: state.user };
}

const profile = React.memo((props) => {
    const [about, setAbout] = useState(true);
    const [me, setMe] = useState(true);
    const [checked, setChecked] = useState(false);
    const [details, setDetails] = useState();
    useEffect(() => {
        if (props.match.params.pid === props.user.pid) {
            setDetails(props.user);
            console.log(details);
            setMe(true);
        } else {
            setMe(false);
        }
        setChecked(true);
    }, [props]);
    console.log(details);
    if (checked === true) {
        return (
            <div className="parent">
                <ProfileDetails user={details} />
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
                {/* {about ? <About /> : <MyProjects view="profile" />} */}
            </div>
        );
    } else {
        return (
            <div /> // loading
        );
    }
});

export default connect(mapStateToProps)(profile);
