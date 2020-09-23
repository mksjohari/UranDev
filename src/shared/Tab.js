import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Button from "./Button";
import SubjectOptions from "./SubjectOptions";
import SkillOptions from "./SkillOptions";
import "./tab.scss";

function Tab() {
  const [tabOne, setTabOne] = useState(true);
  // const [name, setName] = useState("");
  // const [category, setCategory] = useState("");
  // const [location, setLocation] = useState("");
  // const [projectCode, setProjectCode] = useState("");
  // const [projectName, setProjectName] = useState("");

  function handleToggle() {
    setTabOne(!tabOne);
  }
  return (
    <div className="tab-div">
      <div className="tab-list">
        <button
          className={`tab ${tabOne ? "active" : ""}`}
          onClick={tabOne ? null : handleToggle}
        >
          Find a candidate
        </button>
        <button
          className={`tab ${tabOne ? "" : "active"}`}
          onClick={tabOne ? handleToggle : null}
        >
          Find a project
        </button>
      </div>
      {tabOne ? (
        <div className="tab-panel">
          <input className="inp-text search" placeholder="Name" />
          <Dropdown
            width="200px"
            colour="white"
            text="Field of study"
            options={SubjectOptions}
          />
          <input className="inp-text search" placeholder="Location" />
          <Button
            colour="blue"
            iconL={<i className="fas fa-search" />}
            text="Search"
          />
        </div>
      ) : (
        <div className="tab-panel">
          <input className="inp-text search" placeholder="Project code" />
          <Dropdown
            width="450px"
            colour="white"
            text="Skill"
            options={SkillOptions}
            isMulti={true}
          />
          <Button
            colour="pink"
            iconL={<i className="fas fa-search" />}
            text="Search"
          />
        </div>
      )}
    </div>
  );
}

export default Tab;
