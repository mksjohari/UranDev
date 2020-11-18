import React, { useState, useEffect } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import SkillsTab from "./skillsTab";
import Developer from "../../images/developer.svg";
import JobSearch from "../../images/jobsearch.png";
import Button from "../../shared/sandbox/Button";
import Carousel from "../../shared/sandbox/Carousel";
import TaskDnD from "../../shared/reactDnD/taskDnD";

import project from "../../modules/previewProject.module.scss";
import styles from "../../modules/createProject.module.scss";
import buttonStyle from "../../modules/_button.module.scss";
import dnd from "../../modules/DnD.module.scss";
import header from "../../modules/header.module.scss";
import { getFirebase } from "../../shared/firebase/config";
import { connect } from "react-redux";
import { getPidImage, storage } from "../../shared/firebase/firebase";

const getProjectInfo = async (uid, pid, setData, setLoading, setDataLoaded) => {
    const ref = getFirebase()
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("projects")
        .doc(pid);
    const projectInfo = await ref.get();
    setData(projectInfo.data());
    setLoading(false);
    setDataLoaded(true);
};

const getProjectTasks = async (
    uid,
    pid,
    setSkills,
    setTools,
    setTasks,
    dataLoaded
) => {
    const tasks = [];
    const skills = [];
    const tools = [];
    const ref = getFirebase()
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("projects")
        .doc(pid);
    const projectTasks = await ref.collection("tasks").get();
    projectTasks.forEach((taskRaw) => {
        const actions = [];

        taskRaw.data().actions.forEach((action) => {
            const files = [];
            action.skills.forEach(async (skill) => {
                skills.push(skill);
            });
            action.tools.forEach(async (tool) => {
                tools.push(tool);
            });
            action.files.forEach(async (file) => {
                const imageObj = await getPidImage(uid, pid, file);
                files.push(imageObj);
            });
            actions.push({
                actionId: action.actionId,
                description: action.description,
                skills: action.skills,
                tools: action.tools,
                title: action.title,
                files: files,
                skills,
                tools,
            });
        });
        const task = {
            taskId: Math.floor(Math.random() * 10000000000).toString(),
            title: taskRaw.data().title,
            description: taskRaw.data().description,
            index: taskRaw.data().index,
            startDate: taskRaw.data().startDate,
            endDate: taskRaw.data().endDate,
            actions: actions,
        };
        tasks.push(task);
    });
    setSkills(skills);
    setTools(tools);
    setTasks(tasks);
};
const mapStateToProps = (state) => {
    return { user: state.user };
};

function ProjectPage(props) {
    const uid = props.match.params.uid;
    const pid = props.match.params.pid;
    const [data, setData] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [skills, setSkills] = useState([]);
    const [tools, setTools] = useState([]);
    const [tasks, setTasks] = useState();
    const [overview, setOverview] = useState(true);
    const [user, setUser] = useState();
    useEffect(() => {
        setUser(props.user);
        if (!dataLoaded) {
            getProjectInfo(uid, pid, setData, setLoading, setDataLoaded);
        } else {
            if (data !== null) {
                getProjectTasks(
                    uid,
                    pid,
                    setSkills,
                    setTools,
                    setTasks,
                    dataLoaded
                );
            }
        }
    }, [uid, pid, data, dataLoaded, props.user]);
    if (loading === true || dataLoaded === false) {
        return <div>Loading</div>;
    }
    console.log(data);
    return (
        <div>
            <div className={project.cover_div}>
                <label
                    className={`${buttonStyle.cover_btn} ${buttonStyle.button} ${project.cover_button}`}
                >
                    <input type="file" onChange={props.editCover} />
                    <i className="fas fa-camera" style={{ marginRight: 5 }} />
                    Change Cover
                </label>
                <img src={data.coverUrl} alt="cover photo"></img>

                <div className={project.banner}>
                    <div className={project.project_title}>{data.title}</div>
                    <div className={project.details}>
                        <i
                            className="far fa-calendar"
                            style={{ margin: "10px" }}
                        />
                        {`${dateToDMY(
                            data.situation.startDate.toDate()
                        )} - ${dateToDMY(data.situation.endDate.toDate())}`}
                    </div>
                </div>
            </div>
            <div className={`${header.tabBottom}`}>
                <NavLink
                    activeClassName={header.activeProjectTab}
                    to="#"
                    isActive={() => overview}
                    className={header.projectTab}
                    onClick={() => setOverview(true)}
                >
                    Situation & Results
                </NavLink>

                <NavLink
                    activeClassName={header.activeProjectTab}
                    to="#"
                    isActive={() => !overview}
                    className={header.projectTab}
                    onClick={() => setOverview(false)}
                >
                    Tasks & Actions
                </NavLink>
            </div>
            <SkillsTab skills={skills} tools={tools} />
            {overview ? (
                <div className={project.project_ctn}>
                    <div className={project.project_section}>
                        <h1 className={project.h1}>Situation</h1>
                        <div className={project.situation_grid}>
                            <div className={project.summary_div}>
                                {data.summary}
                            </div>
                            <div
                                className={`${project.stats_div} ${project.stats_text}`}
                            >
                                <div className={project.stats}>
                                    <div className={project.icon_text}>
                                        <i className="far fa-user" />
                                        <div className={project.left_margin}>
                                            Team Size
                                        </div>
                                    </div>
                                    <div className={project.details}>
                                        {data.teamSize}
                                    </div>
                                </div>
                                <div className={project.stats}>
                                    <div className={project.icon_text}>
                                        <i className="fas fa-dollar-sign" />
                                        <div className={project.left_margin}>
                                            Budget
                                        </div>
                                    </div>
                                    <div className={project.details}>
                                        {data.budget
                                            ? `${data.budget} ${data.currency.value}`
                                            : "No budget"}
                                    </div>
                                </div>
                                <div className={project.stats}>
                                    <div className={project.icon_text}>
                                        <i className="far fa-clock" />
                                        <div className={project.left_margin}>
                                            Duration
                                        </div>
                                    </div>
                                    <div className={project.details}>
                                        {moment
                                            .duration(
                                                data.situation.endDate -
                                                    data.situation.startDate
                                            )
                                            .humanize({ d: 7, w: 4 })}
                                    </div>
                                </div>
                            </div>

                            <div className={project.user_div}>
                                <img
                                    src={JobSearch}
                                    alt="jobsearch"
                                    className={project.profile_pic}
                                />
                                <div className={project.name}>
                                    {`${user.firstName} ${user.lastName}`}
                                </div>
                                <div className={project.details}>
                                    {data.role}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={project.project_section}>
                        <h1 className={project.h1}>Results</h1>
                        <div className={project.conclusion_grid}>
                            <div className={project.results_links}>
                                {data.results.links.length
                                    ? data.results.links.map((link, index) => (
                                          <a
                                              className={`${styles.section_link}`}
                                              href={link.url}
                                          >
                                              <i className="fas fa-link" />
                                              <div className={styles.link_text}>
                                                  {link.linkName}
                                              </div>
                                          </a>
                                      ))
                                    : ""}
                            </div>
                            <div className={project.conclusion}>
                                {data.results.conclusion}
                            </div>
                        </div>
                        {data.results.sections.length
                            ? data.results.sections.map((section, index) => (
                                  <div className={`${project.top_margin}`}>
                                      {section.files.length
                                          ? sectionGrid(section)
                                          : sectionGridless(section)}
                                  </div>
                              ))
                            : ""}
                    </div>
                </div>
            ) : (
                <div className={project.project_ctn}>
                    <div className={project.project_section}>
                        <h1 className={project.h1}>Tasks & Actions</h1>
                        <TaskDnD data={tasks} readOnly />
                    </div>
                </div>
            )}
            <div className={project.center}>
                <img
                    src={Developer}
                    alt="Developer"
                    className={project.preview_end}
                />
            </div>
            <div className={styles.button_footer}>
                <Button
                    iconL={<i className="fas fa-arrow-left" />}
                    text="Back"
                    onClick={props.prevStep}
                />
                <Button
                    className={styles.save_draft}
                    iconR={<i className="fas fa-flag" />}
                    text="Complete Project"
                    onClick={props.finishProject}
                />
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(ProjectPage);

function sectionGrid(section) {
    return (
        <div className={styles.section_grid}>
            <div className={styles.section_left}>
                <div className={styles.section_desc}>{section.description}</div>
                {section.sectionLink.url ? (
                    <a
                        className={`${styles.section_link}`}
                        href={section.sectionLink.url}
                    >
                        <i className="fas fa-link" />
                        <div className={styles.link_text}>
                            {section.sectionLink.linkName}
                        </div>
                    </a>
                ) : (
                    ""
                )}
            </div>
            <div className={styles.section_right}>
                <div className={dnd.carousel_display}>
                    {/* <Carousel files={section.files} /> */}
                </div>
            </div>
        </div>
    );
}
function sectionGridless(section) {
    return (
        <div className={styles.section_left}>
            <div className={styles.section_desc}>{section.description}</div>
            {section.sectionLink.url ? (
                <a
                    className={`${styles.section_link}`}
                    href={section.sectionLink.url}
                >
                    <i className="fas fa-link" />
                    <div className={styles.link_text}>
                        {section.sectionLink.linkName}
                    </div>
                </a>
            ) : (
                ""
            )}
        </div>
    );
}

export function dateToDMY(date) {
    console.log(date);
    return `${date.getDate()}/${
        date.getUTCMonth() + 1
    }/${date.getUTCFullYear()}`;
}
