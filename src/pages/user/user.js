import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "../../modules/header.module.scss";
import ProfileDetails from "./userDetails";
import About from "./about";
import MyProjects from "../projects/myProjects";
import { getFirebase } from "../../shared/firebase/config";

function mapStateToProps(state) {
    return { user: state.user };
}

const getDetails = async (uid, setDetails, setChecked) => {
    const userInfo = await getFirebase()
        .firestore()
        .collection("users")
        .doc(uid)
        .get();
    if (!userInfo.data) {
        setDetails({});
    } else {
        setDetails(userInfo.data());
    }
    setChecked(true);
};

const profile = React.memo((props) => {
    const [about, setAbout] = useState(false);
    const [checked, setChecked] = useState(false);
    const [details, setDetails] = useState({});
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedTools, setSelectedTools] = useState([]);
    const uid = props.match.params.uid;
    useEffect(() => {
        if (uid === props.user.uid) {
            console.log("ME");
            setDetails(props.user, setChecked);
            setChecked(true);
        } else {
            console.log("NOT ME");
            getDetails(uid, setDetails, setChecked);
        }
    }, [props, uid]);
    useEffect(() => {
        console.log(selectedSkills, selectedTools);
    }, [selectedTools, selectedSkills]);
    if (checked === true && Object.keys(details).length !== 0) {
        return (
            <div>
                <ProfileDetails user={details} />
                <div className={`${styles.tabTop}`}>
                    <NavLink
                        activeClassName={styles.activeTabItem}
                        to="#"
                        isActive={() => about}
                        className={styles.tabItem}
                        onClick={() => setAbout(true)}
                    >
                        About
                    </NavLink>

                    <NavLink
                        activeClassName={styles.activeTabItem}
                        to="#"
                        isActive={() => !about}
                        className={styles.tabItem}
                        onClick={() => setAbout(false)}
                    >
                        Projects
                    </NavLink>
                </div>
                {about ? (
                    <About
                        setAbout={setAbout}
                        description={details.description}
                        setSelectedSkills={setSelectedSkills}
                        setSelectedTools={setSelectedTools}
                        skills={details.skills}
                        tools={details.tools}
                    />
                ) : (
                    <MyProjects
                        selectedSkills={selectedSkills}
                        selectedTools={selectedTools}
                        setSelectedSkills={setSelectedSkills}
                        setSelectedTools={setSelectedTools}
                        view="profile"
                        user={details}
                    />
                )}
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
