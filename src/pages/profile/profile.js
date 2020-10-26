import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import tab from "../../modules/header.module.scss";
import { getUserExpertise, getPublicInfo, getUserSocials } from "../../shared/firebase/firebase";
import ProfileDetails from "./profileDetails";
import About from "./about";
import MyProjects from "../projects/myProjects";

function mapStateToProps(state) {
    return { user: state.user };
}

const getDetails = async (pid, setDetails,setChecked) => {
    const userInfo = await getPublicInfo({pid});
    const userSocials = await getUserSocials({pid});
    const userExpertise = await getUserExpertise({pid});
    console.log(userSocials)
    setDetails( {
        firstName: userInfo.data.firstName,
        lastName: userInfo.data.lastName,
        photoUrl: userInfo.data.photo,
        location: userInfo.data.location,
        occupation: userInfo.data.occupation,
        description: userInfo.data.description,
        social: userSocials.data,
        expertise: userExpertise.data
    })
    setChecked(true)
    
}

const profile = React.memo((props) => {
    const [about, setAbout] = useState(true);
    const [checked, setChecked] = useState(false);
    const [details, setDetails] = useState();
    const pid = props.match.params.pid
    useEffect(() => {
        if(pid === props.user.pid){
            setDetails(props.user)
            setChecked(true)
        }
        else{
            getDetails(pid, setDetails, setChecked)
        }
    }, [props, pid]);
    console.log(props.user)
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
                {about ? <About /> : <MyProjects view="profile" />}
            </div>
        );
    } else {
        return (
            <div /> // loading
        );
    }
});

export default connect(mapStateToProps)(profile);
