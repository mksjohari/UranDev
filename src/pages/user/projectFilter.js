import React, { useState } from "react";
import Button from "../../shared/sandbox/Button";
import styles from "../../modules/skillsTab.module.scss";

function ProjectFilter(props) {
    const [showTab, setshowTab] = useState(false);
    const selectedSkills = props.selectedSkills;
    const selectedTools = props.selectedTools;
    const setSelectedSkills = props.setSelectedSkills;
    const setSelectedTools = props.setSelectedTools;
    const skills = props.skills;
    const tools = props.tools;
    const isSkillSelected = (v) =>
        `${styles.span_tab} ${
            selectedSkills.includes(v) ? styles.skill_selected : styles.skill
        }`;

    const isToolSelected = (v) =>
        `${styles.span_tab} ${styles.tool} ${
            selectedTools.includes(v) ? styles.tool_selected : ""
        }`;

    const selectSkill = (v) =>
        selectedSkills.includes(v)
            ? setSelectedSkills(selectedSkills.filter((e) => e !== v))
            : setSelectedSkills([...selectedSkills, v]);

    const selectTool = (v) =>
        selectedTools.includes(v)
            ? setSelectedTools(selectedTools.filter((e) => e !== v))
            : setSelectedTools([...selectedTools, v]);

    return (
        <div className={styles.root}>
            <div className={styles.btn_row}>
                <h2 className={styles.title}>Public Projects</h2>
                {showTab ? (
                    <Button
                        // className="yellow"
                        iconL={<i className="fas fa-filter"></i>}
                        text="Hide filter"
                        onClick={() => setshowTab(!showTab)}
                    />
                ) : (
                    <Button
                        className="yellow"
                        iconL={<i className="fas fa-filter"></i>}
                        text="Filter"
                        onClick={() => setshowTab(!showTab)}
                    />
                )}
            </div>
            {showTab ? (
                <div className={styles.flex_container}>
                    <h5>Filter projects by</h5>
                    <div className={styles.filter_ctn}>
                        <div className={styles.skills_div}>
                            <p className={styles.p}>Skills developed:</p>
                            <div className={styles.tab_ctn}>
                                {skills.map((skill, index) => (
                                    <div onClick={() => selectSkill(skill)}>
                                        <span
                                            key={index}
                                            className={isSkillSelected(skill)}
                                        >
                                            {skill}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.tools_div}>
                            <p className={styles.p}>Tools involved:</p>
                            <div className={styles.tab_ctn}>
                                {tools.map((tool, index) => (
                                    <div onClick={() => selectTool(tool)}>
                                        <span
                                            key={index}
                                            className={isToolSelected(tool)}
                                        >
                                            {tool}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default ProjectFilter;
