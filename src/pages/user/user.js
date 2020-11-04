import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import tab from "../../modules/header.module.scss";
import {
    getUserExpertise,
    getPublicInfo,
    getUserSocials,
} from "../../shared/firebase/firebase";
import ProfileDetails from "./userDetails";
import About from "./about";
import MyProjects from "../projects/myProjects";

function mapStateToProps(state) {
    return { user: state.user };
}

const getDetails = async (uid, setDetails, setChecked) => {
    const userInfo = await getPublicInfo({ uid });
    const userSocials = await getUserSocials({ uid });
    const userExpertise = await getUserExpertise({ uid });
    if (!userInfo.data) {
        console.log("???");
        setDetails({});
    } else {
        setDetails({
            firstName: userInfo.data.firstName,
            lastName: userInfo.data.lastName,
            photoUrl: userInfo.data.photo,
            location: userInfo.data.location,
            occupation: userInfo.data.occupation,
            description: userInfo.data.description,
            social: userSocials.data,
            expertise: userExpertise.data,
        });
    }
    setChecked(true);
};

const profile = React.memo((props) => {
    const [about, setAbout] = useState(true);
    const [checked, setChecked] = useState(false);
    const [details, setDetails] = useState({});
    const uid = props.match.params.uid;
    useEffect(() => {
        if (uid === props.user.uid) {
            setDetails(props.user);
            setChecked(true);
        } else {
            getDetails(uid, setDetails, setChecked);
        }
    }, [props, uid]);
    if (checked === true && Object.keys(details).length !== 0) {
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
                {about ? <About /> : <MyProjects view="profile" />}
            </div>
        );
    } else {
        return (
            <div>
                <h1>Loading / User Not Found</h1>
                <h3>Havent added conditions yet</h3>
            </div>
        );
    }
});

export default connect(mapStateToProps)(profile);
