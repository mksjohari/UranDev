import React, { useState } from "react";
import Dropdown from "../../shared/sandbox/Dropdown";
import Button from "../../shared/sandbox/Button";
import SubjectOptions from "../../shared/sandbox/SubjectOptions";
import SkillOptions from "../../shared/sandbox/SkillOptions";
import styles from "../../modules/tab.module.scss";

function Tab(props) {
    const [tabOne, setTabOne] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [expertise, setExpertise] = useState("");
    const [code, setCode] = useState("");
    const [skill, setSkill] = useState("");

    function handleToggle() {
        setTabOne(!tabOne);
    }

    function onHandleSubmit(e) {
        e.preventDefault();
        props.filterSearch(firstName, lastName, expertise);
    }
    return (
        <div>
            <div className={styles.tab_div}>
                <div className={styles.tab_list}>
                    <button
                        className={`${styles.tab} ${
                            tabOne ? styles.tab_active : ""
                        }`}
                        onClick={tabOne ? null : handleToggle}
                    >
                        Find a candidate
                    </button>
                    <button
                        className={`${styles.tab} ${
                            tabOne ? "" : styles.tab_active
                        }`}
                        onClick={tabOne ? handleToggle : null}
                    >
                        Find a project
                    </button>
                </div>
                {tabOne ? (
                    <form onSubmit={onHandleSubmit}>
                        <div className={styles.tab_panel}>
                            <input
                                name="firstname"
                                className={`${styles.inp_text} ${styles.search}`}
                                placeholder="firstname"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                name="lastname"
                                className={`${styles.inp_text} ${styles.search}`}
                                placeholder="lastname"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <Dropdown
                                width="200px"
                                colour="white"
                                text="Expertise"
                                options={SubjectOptions}
                                value={expertise}
                                onChange={(e) => setExpertise(e)}
                            />
                            <Button
                                type="submit"
                                colour="blue"
                                iconL={<i className="fas fa-search" />}
                                text="Search"
                            />
                        </div>
                    </form>
                ) : (
                    <form onSubmit={onHandleSubmit}>
                        <div className={styles.tab_panel}>
                            <input
                                name="code"
                                className={`${styles.inp_text} ${styles.search}`}
                                placeholder="Project code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <Dropdown
                                width="450px"
                                colour="white"
                                text="Skill"
                                options={SkillOptions}
                                isMulti={true}
                                value={skill}
                                onChange={(e) => setSkill(e)}
                            />
                            <Button
                                type="submit"
                                colour="pink"
                                iconL={<i className="fas fa-search" />}
                                text="Search"
                            />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Tab;
