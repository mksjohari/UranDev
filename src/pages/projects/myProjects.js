import React from "react";
import { Link } from "react-router-dom";

import FindProjects from "../../shared/sandbox/FindProjects";
import CardSmall from "./cardSmall";
import styles from "../../modules/projects.module.scss";
import Button from "../../shared/sandbox/Button";

function MyProjects(props) {
    return (
        <div className={styles.root}>
            <FindProjects view={props.view} />
            {props.view === "edit" ? (
                <div className={styles.center}>
                    <Link to="/drafts">
                        <Button
                            className={styles.add_project}
                            text="Add project"
                            iconB="+"
                        />
                    </Link>
                </div>
            ) : (
                ""
            )}
            <div className={styles.project_section}>
                <h3 className={styles.section_title}>2020</h3>
                <div className={styles.flex_grid}>
                    <CardSmall view={props.view} />
                    <CardSmall view={props.view} />
                    <CardSmall view={props.view} />
                    <CardSmall view={props.view} />
                    <CardSmall view={props.view} />
                </div>
            </div>
        </div>
    );
}
export default MyProjects;
