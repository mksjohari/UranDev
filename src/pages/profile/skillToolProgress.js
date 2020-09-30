import React from "react";
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import styles from "../../modules/profile.module.scss";

function SkillToolProgress(props) {
    return (
        <div className={styles.progress_section}>
                <text className={styles.progress_text}>{props.item.label}</text>
                <div className={styles.progress_bar}>
                    <div className={styles.progress_endorsers}>
                        10 endorsers
                    </div>
                    <ProgressBar
                        width={window.innerWidth * 0.2}
                        height="10px"
                        filledBackground={
                            props.type === "skill" ? "#fad47a" : ""
                        }
                        percent={props.item.value * 10}
                    />
                </div>
        </div>
    );
}
export default SkillToolProgress;
