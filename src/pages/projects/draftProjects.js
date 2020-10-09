import React from "react";
import { Link } from "react-router-dom";

import styles from "../../modules/createProject.module.scss";

function DraftProjects(props) {
    return (
        <div className={styles.root}>
            <div className={styles.frame}>
                <Link className={styles.round} to="/create">
                    <i class="fas fa-plus fa-3x"></i>
                </Link>
            </div>
        </div>
    );
}
export default DraftProjects;
