import React, { useState } from "react";
import Dropdown from "../../shared/sandbox/Dropdown";
import Button from "../../shared/sandbox/Button";
import SubjectOptions from "../../shared/sandbox/SubjectOptions";
import SkillOptions from "../../shared/sandbox/SkillOptions";
import styles from "../../modules/tab.module.scss";

function Tab() {
    const [tabOne, setTabOne] = useState(true);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [code, setCode] = useState("");
    const [skill, setSkill] = useState("");

    function handleToggle() {
        setTabOne(!tabOne);
    }

    function onHandleSubmit(e) {
        e.preventDefault();
        console.log("yea");
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
                                name='name'
                                className={`${styles.inp_text} ${styles.search}`}
                                placeholder='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className={styles.user_dropdown}>
                                <Dropdown
                                    width='100%'
                                    colour='white'
                                    text='Field of study'
                                    options={SubjectOptions}
                                    value={category}
                                    onChange={(e) => setCategory(e)}
                                />
                            </div>
                            <input
                                name='location'
                                className={`${styles.inp_text} ${styles.search}`}
                                placeholder='Location'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <Button
                                type='submit'
                                colour='blue'
                                iconL={<i className='fas fa-search' />}
                                text='Search'
                            />
                        </div>
                    </form>
                ) : (
                    <form onSubmit={onHandleSubmit}>
                        <div className={styles.tab_panel}>
                            <input
                                name='code'
                                className={`${styles.inp_text} ${styles.search}`}
                                placeholder='Project code'
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <div className={styles.proj_dropdown}>
                                <Dropdown
                                    width='100%'
                                    colour='white'
                                    text='Skill'
                                    options={SkillOptions}
                                    isMulti={true}
                                    value={skill}
                                    onChange={(e) => setSkill(e)}
                                />
                            </div>
                            <Button
                                type='submit'
                                colour='pink'
                                iconL={<i className='fas fa-search' />}
                                text='Search'
                            />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Tab;
