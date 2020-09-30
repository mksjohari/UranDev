import React from "react";
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import "./profile.scss";

function SkillToolProgress(props) {
    return (
        <div className="progress-section">
            <div className="progress-column">
                <div className="column-left">
                    <text className="progress-text">{props.item.label}</text>
                </div>
                <div className="column-right">
                    <div className="progress-endorsers">
                        10 endorsers
                    </div>
                    <ProgressBar
                        width={
                            window.innerWidth > 720
                                ? window.innerWidth * 0.25
                                : window.innerWidth * 0.5
                        }
                        height="10px"
                        filledBackground={
                            props.type === "skill" ? "#fad47a" : ""
                        }
                        percent={props.item.value * 10}
                    />
                </div>
            </div>
        </div>
    );
}
export default SkillToolProgress;
