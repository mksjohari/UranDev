import React from "react";
import styles from "../../modules/tmp.module.scss";

function ActionContent(props) {
    return (
        <>
            <div>{props.tools[0] ? "Used tools" : ""}</div>
            <div className={props.tools[0] ? styles.tools : ""}>
                {props.tools[0] ? (
                    props.tools.map((tool) => (
                        <span className={styles.toolItem}>{tool}</span>
                    ))
                ) : (
                    <></>
                )}
            </div>
            <div>{props.skills[0] ? "Used skills" : ""}</div>
            <div className={props.skills[0] ? styles.skills : ""}>
                {props.skills[0] ? (
                    props.skills.map((skill) => (
                        <span className={styles.skillItem}>{skill}</span>
                    ))
                ) : (
                    <></>
                )}
            </div>
            <div>{props.description.length ? "Description:" : ""}</div>
            <div className={styles.description}>{props.description}</div>
        </>
    );
}

export default ActionContent;
