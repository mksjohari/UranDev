import React, { useState } from "react";
import WordBubble from "./wordBubble";
import Button from "../../shared/Button";
import SkillToolProgress from "./skillToolProgress";
import "./profile.scss";

const test = [
    { label: "CRM", value: 1 },
    { label: "API", value: 1 },
    { label: "Data", value: 1 },
    { label: "Commerce", value: 1 },
    { label: "AI", value: 3 },
    { label: "Management", value: 5 },
    { label: "Testing", value: 6 },
    { label: "Mobile", value: 9 },
    { label: "Conversion", value: 9 },
    { label: "Misc", value: 21 },
    { label: "Databases", value: 22 },
    { label: "DevOps", value: 22 },
    { label: "Javascript", value: 23 },
    { label: "Languages/ Frameworks", value: 25 },
    { label: "Front End", value: 26 },
    { label: "Content", value: 50 },
];

function About(props) {
    return (
        <div className="about">
            <div className="large-section">
                <div className="heading">
                    <div className="text-heading">
                        <i className="far fa-user fa-2x"></i>
                        <h2 className="text-detail text-title">Biography</h2>
                    </div>
                </div>
                <div className="text-biography">
                    Longer description ayyyyyyy, Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esseLonger description
                    ayyyyyyy, Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse
                    <br />
                    <br />
                    Longer description ayyyyyyy, Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse
                </div>
            </div>
            <div className="large-section">
                <div className="heading">
                    <div className="text-heading">
                        <i className="far fa-star fa-2x"></i>
                        <h2 className="text-detail text-title">Skills</h2>
                    </div>
                    <div className="endorse-button">
                        <Button
                            colour="yellow"
                            iconR={<i className="fas fa-check"></i>}
                            text="Endorse a skill"
                        />
                    </div>
                </div>
                <div className="column-section">
                    <div className="column-left">
                        <WordBubble type="skill" data={test} />
                    </div>
                    <div className="column-right">
                        {test.map((item, index) => (
                            <SkillToolProgress key={index} type="skill" item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
