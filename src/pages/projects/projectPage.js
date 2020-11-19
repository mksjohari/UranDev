import React, { useState, useEffect } from "react";
import moment from "moment";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import SkillsTab from "./skillsTab";
import TaskDnD from "../../shared/reactDnD/taskDnD";
import { getFirebase } from "../../shared/firebase/config";
import { getPidImage, addToStats } from "../../shared/firebase/firebase";
import Button from "../../shared/sandbox/Button";
import { lockBg } from "../../shared/sandbox/Popup";
import EndorseList from "../../shared/input/EndorseList";

import project from "../../modules/previewProject.module.scss";
import styles from "../../modules/createProject.module.scss";
import buttonStyle from "../../modules/_button.module.scss";
import dnd from "../../modules/DnD.module.scss";
import popup from "../../modules/popup.module.scss";
import header from "../../modules/header.module.scss";
import logout from "../../modules/logout.module.scss";

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
            action.skills.forEach((skill) => {
                skills.push(skill);
            });
            action.tools.forEach((tool) => {
                tools.push(tool);
            });
            action.files.forEach(async (file) => {
                const imageObj = await getPidImage(uid, pid, file);
                files.push(imageObj);
            });
            actions.push({
                actionId: action.actionId,
                description: action.description,
                title: action.title,
                files: files,
                skills,
                tools,
            });
        });
        const task = {
            tid: taskRaw.data().tid,
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

const editProject = async (uid, project, tasks, history) => {
    console.log(uid, project.pid);
    const preview = await getFirebase()
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("projectPreviews")
        .doc(project.pid)
        .get();
    project.tasks = tasks;
    const oldSkills = {};
    const oldTools = {};
    project.tasks.map(async (task, index) => {
        task.actions.forEach((action) => {
            action.skills.forEach((skill) => {
                addToStats(oldSkills, skill);
            });
            action.tools.forEach((tool) => {
                addToStats(oldTools, tool);
            });
        });
    });
    project.oldSkills = oldSkills;
    project.oldTools = oldTools;
    history.push("/edit", { projectData: project });
};

function ProjectPage(props) {
    const uid = props.match.params.uid;
    const pid = props.match.params.pid;
    const [isMe, setIsMe] = useState();
    const [data, setData] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [skills, setSkills] = useState([]);
    const [tools, setTools] = useState([]);
    const [tasks, setTasks] = useState();
    const [overview, setOverview] = useState(true);
    const [user, setUser] = useState();
    const history = useHistory();
    const [endorsements, setEndorsements] = useState(endorsementData);
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
        props.user.uid === uid ? setIsMe(true) : setIsMe(false);
    }, [uid, pid, data, dataLoaded, props.user]);
    if (loading === true || dataLoaded === false) {
        return <div>Loading</div>;
    }
    const editEndorsements = (values) => {
        setEndorsements(endorsements.push(values));
    };
    return (
        <div>
            <div className={project.cover_div}>
                {isMe ? (
                    <label
                        className={`${buttonStyle.cover_btn} ${buttonStyle.button} ${project.cover_button}`}
                        onClick={() => {
                            editProject(uid, data, tasks, history);
                        }}
                    >
                        <i className="fas fa-edit" style={{ marginRight: 5 }} />
                        Edit Project
                    </label>
                ) : (
                    ""
                )}
                <img
                    className={project.cover_img}
                    src={data.coverUrl}
                    alt="cover"
                />
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
                                {data.situation.summary}
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
                                        {data.situation.teamSize}
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
                                        {data.situation.budget
                                            ? `${data.situation.budget} ${data.situation.currency.value}`
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
                                    src={user.photoUrl}
                                    alt="user"
                                    className={project.profile_pic}
                                />
                                <div className={project.name}>
                                    {`${user.firstName} ${user.lastName}`}
                                </div>
                                <div className={project.details}>
                                    {data.situation.role}
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
                                              key={index}
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
                                  <div
                                      key={index}
                                      className={`${project.top_margin}`}
                                  >
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
            <div className={project.project_ctn}>
                <div className={project.section_footer}>
                    <h1 className={project.h1}>Endorsements</h1>
                    <Button
                        id={data.pid}
                        className={`yellow`}
                        iconR={<i className="fas fa-check"></i>}
                        text="Endorse Project"
                        onClick={lockBg}
                    />
                    <div
                        className={popup.popupContainer}
                        id={data.pid + "_popContent"}
                    >
                        {console.log(data)}
                        <EndorseList
                            id={data.pid}
                            skills={skills}
                            tools={tools}
                            editEndorsements={editEndorsements}
                            data={data}
                        />
                    </div>
                </div>
                {endorsements.map((endorsement, index) => (
                    <div className={styles.section_card} key={index}>
                        <img
                            className={logout.profile_pic}
                            src={endorsement.photoUrl}
                            alt="profile"
                        />
                    </div>
                ))}
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
    return `${date.getDate()}/${
        date.getUTCMonth() + 1
    }/${date.getUTCFullYear()}`;
}

const endorsementData = [
    {
        uid: "uid",
        comment: "", //
        skills: [], //
        tools: [], //
        date: "",
        photoUrl: "",
        name: "",
    },
    {
        uid: "uid",
        comment: "", //
        skills: [], //
        tools: [], //
        date: "",
        photoUrl: "",
        name: "",
    },
];
