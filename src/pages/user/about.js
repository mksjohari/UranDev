import React from "react";
import WordBubble from "./wordBubble";
import Button from "../../shared/sandbox/Button";
import SkillToolProgress from "./skillToolProgress";
import styles from "../../modules/profile.module.scss";

function About(props) {
    const skills = Object.entries(props.skills);
    const tools = Object.entries(props.tools);
    const sortedSkills = skills.sort((a, b) => b.value - a.value);
    const sortedTools = tools.sort((a, b) => b.value - a.value);

    return (
        <div className={styles.about}>
            <div className={styles.large_section}>
                <div className={styles.text_heading}>
                    <i className="far fa-user fa-2x"></i>
                    <h2
                        className={`${styles.text_detail} ${styles.text_title}`}
                    >
                        Description
                    </h2>
                </div>
                <div>{props.description}</div>
            </div>
            <div className={styles.large_section}>
                <div className={styles.heading_endorse}>
                    <div className={styles.text_heading}>
                        <i className="far fa-star fa-2x"></i>
                        <h2
                            className={`${styles.text_detail} ${styles.text_title}`}
                        >
                            Skills
                        </h2>
                    </div>
                    <div className={styles.endorse_button}>
                        <Button
                            className={styles.endorse_skill}
                            iconR={<i className="fas fa-check"></i>}
                            text="Endorse a skill"
                        />
                    </div>
                </div>
                <div className={styles.column_section}>
                    <WordBubble type="skill" data={skills} />
                    <div className={styles.bar_section}>
                        {sortedSkills.map((item, index) => (
                            <SkillToolProgress
                                key={index}
                                type="skill"
                                item={item}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.large_section}>
                <div className={styles.heading_endorse}>
                    <div className={styles.text_heading}>
                        <i className="fas fa-wrench fa-2x"></i>
                        <h2
                            className={`${styles.text_detail} ${styles.text_title}`}
                        >
                            Tools
                        </h2>
                    </div>
                    <div className={styles.endorse_button}>
                        <Button
                            className={styles.endorse_tool}
                            iconR={<i className="fas fa-check"></i>}
                            text="Endorse a tool"
                        />
                    </div>
                </div>
                <div className={styles.column_section}>
                    <WordBubble type="tool" data={tools} />
                    <div className={styles.bar_section}>
                        {sortedTools.map((item, index) => (
                            <SkillToolProgress
                                key={index}
                                type="tool"
                                item={item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
