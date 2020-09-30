import { Card } from "@material-ui/core";
import React from "react";

import FindProjects from "../../shared/FindProjects";
import CardSmall from "./cardSmall";
import "./projects.scss";

function MyProjects(props) {
    return (
        <div className="root">
            <FindProjects view={props.view} />
            <div className="project-section">
                <h3 className="section-title">2020</h3>
                <div className="flex-grid">
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
