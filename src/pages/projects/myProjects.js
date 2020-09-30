import React from "react";

import FindProjects from "../../shared/sandbox/FindProjects";
import CardSmall from "./cardSmall";
import styles from "../../modules/projects.module.scss";

function MyProjects(props) {
    return (
        <div className={styles.root}>
            <FindProjects view={props.view} />
            <div className={styles.project_section}>
                <h3 className={styles.section_title}>2020</h3>
                <div className={styles.flex_grid}>
                    <CardSmall view={props.view}/>
                    <CardSmall view={props.view}/>
                    <CardSmall view={props.view}/>
                    <CardSmall view={props.view}/>
                    <CardSmall view={props.view}/>
                </div>
            </div>
        </div>
    );
}
export default MyProjects;
