import React from "react";
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

import { withContext } from "../../shared/react-dims";
import styles from "../../modules/profile.module.scss";

function SkillToolProgress(props) {
    const colour = {
        skill: ["#fad47a", "#FAEBB3"],
        tool: ["#3E4D74", "#AFDEE9"],
    };
    return (
        <div className={styles.progress_section}>
            <span className={styles.progress_text}>{props.item.label}</span>
            <div className={styles.progress_bar}>
                <div className={styles.progress_endorsers}>10 endorsers</div>
                <ProgressBar
                    width={
                        window.innerWidth < 992
                            ? props.dims.width * 0.4
                            : props.dims.width * 0.15
                    }
                    height="10px"
                    filledBackground={
                        props.item.value < 10
                            ? colour[props.type][1]
                            : colour[props.type][0]
                    }
                    percent={
                        props.item.value * 10 < 100
                            ? props.item.value * 10
                            : 100
                    }
                />
            </div>
        </div>
    );
}
export default withContext(SkillToolProgress);
