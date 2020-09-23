import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import "./timeline.scss";

function Timeline(props) {
  return (
    <>
      <ProgressBar
        percent={props.percent}
        filledBackground="#bbbbbb"
        height="3px"
      >
        <Step>
          {({ accomplished, position }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : ""} ${
                props.percent === position ? "current" : ""
              }`}
            >
              {props.percent > position ? <i className="fas fa-check" /> : ""}
              <p className="timeline-label">ACCOUNT INFORMATION</p>
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, position }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : ""} ${
                props.percent === position ? "current" : ""
              }`}
            >
              {props.percent > position ? <i className="fas fa-check" /> : ""}
              <p className="timeline-label">BACKGROUND INFORMATION</p>
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, position }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : ""} ${
                props.percent === position ? "current" : ""
              }`}
            >
              {props.percent > position ? <i className="fas fa-check" /> : ""}
              <p className="timeline-label">PERSONAL DETAILS</p>
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, position }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : ""} ${
                props.percent === position ? "current" : ""
              }`}
            >
              {props.percent > position ? <i className="fas fa-check" /> : ""}
              <p className="timeline-label">SKILLS</p>
            </div>
          )}
        </Step>
      </ProgressBar>
    </>
  );
}

export default Timeline;
