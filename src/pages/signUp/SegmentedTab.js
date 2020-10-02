import React, { useState } from "react";
import "../../modules/tab.scss";

function SegmentedTab(props) {
    function setEmployer() {
        props.setRole("Employer");
    }
    function setJobseeker() {
        props.setRole("Jobseeker");
    }
    return (
        <div className="segmented-tab">
            <button
                className={`role ${props.role === "Jobseeker" ? "active" : ""}`}
                onClick={setJobseeker}
            >
                I'm a <span>Jobseeker</span>
            </button>
            <button
                className={`role ${props.role === "Employer" ? "active" : ""}`}
                onClick={setEmployer}
            >
                I'm an <span>Employer</span>
            </button>
        </div>
    );
}

export default SegmentedTab;
