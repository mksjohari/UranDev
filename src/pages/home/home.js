import React from "react";

import JobSearch from "../../images/jobsearch.png";
import "../../modules/signUp.module.scss";
import "react-step-progress-bar/styles.css";
import styles from "../../modules/home.module.scss";

const Home = (props) => {
    return (
        <div>
            <h1>Welcome to URAN,</h1>
            <p style={{ fontSize: "16px" }}>Create your e-portfolio today!</p>
            <div className={styles.imgctn}>
                <img
                    className={styles.jobsearch_img}
                    src={JobSearch}
                    alt="jobsearch"
                />
            </div>
        </div>
    );
};

export default Home;
