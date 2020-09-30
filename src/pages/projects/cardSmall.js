import React from "react";

import "./projects.scss";

function CardSmall(props) {
    return (
        <div className="card-small">
            <div className="row-section">
                <div className="row-top">
                    <img
                        className="cover-photo"
                        src={require("../../images/jobsearch.png")}
                        alt="project"
                    />
                </div>
                <div className="row-bottom">
                    <div className="card-title card-text">
                        Reacto development with friends
                    </div>
                    <div className="card-detail">
                        <div className="card-text">
                            <i className="fas fa-map-marked-alt"></i>
                            <text className="text-detail">
                                01/01/2011 - 20/03/2020
                            </text>
                        </div>
                        <div className="card-text">
                            <i className="fas fa-map-marked-alt"></i>
                            <text className="text-detail">
                                Full-stack developer
                            </text>
                        </div>
                    </div>
                    <div className="card-tags">
                        <span
                            className={`tag-type ${
                                props.view === "profile" ? "Skill" : "Edit"
                            }`}
                        >
                            Web development
                        </span>
                        <span
                            className={`tag-type ${
                                props.view === "profile" ? "Tool" : "Edit"
                            }`}
                        >
                            SQL
                        </span>
                        <span
                            className={`tag-type ${
                                props.view === "profile" ? "Tool" : "Edit"
                            }`}
                        >
                            React
                        </span>
                        <span
                            className={`tag-type ${
                                props.view === "profile" ? "Tool" : "Edit"
                            }`}
                        >
                            React
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CardSmall;
