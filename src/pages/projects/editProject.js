import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { withContext } from "../../shared/react-dims";
import moment from "moment";

import Button from "../../shared/sandbox/Button";
import Timeline from "../../shared/sandbox/Timeline";
import { lockBg } from "../../shared/sandbox/Popup";
import ProjectDetails from "../../shared/input/ProjectDetails";
import Situation from "./situation";
import TasksActions from "./tasksActions";
import Results from "./results";
import Preview from "./previewProject";
import Alert from "../../shared/sandbox/Alert";

import popup from "../../modules/popup.module.scss";
import styles from "../../modules/createProject.module.scss";
import {
    uploadProject,
    addSkillsAndTools,
} from "../../shared/firebase/firebase";
import { useHistory } from "react-router-dom";
import { getProjectTasks } from "./projectPage";

function mapStateToProps(state) {
    return { user: state.user };
}

async function addSkillsTools(user, project) {
    var skills = [];
    var tools = [];
    const date = new Date().getTime();
    project.tasks.forEach((task) => {
        task.actions.forEach((action) => {
            action.skills.forEach((skill) => {
                skills.push({
                    uuid: user.uuid,
                    uid: user.uid,
                    skill,
                    created: date.toString(),
                });
            });
            action.tools.forEach((tool) => {
                tools.push({
                    uuid: user.uuid,
                    uid: user.uid,
                    tool,
                    created: date.toString(),
                });
            });
        });
    });
    await addSkillsAndTools({ skills, tools });
}

function EditProject(props) {
    const [percent, setPercent] = useState(0);
    const [step, setStep] = useState(0);
    const [tasks, setTasks] = useState();
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState({
        ...props.location.state.projectData,
    });
    const history = useHistory();
    useEffect(() => {
        getProjectTasks(
            props.user.uid,
            project.pid,
            null,
            null,
            setTasks,
            true
        );
        project.tasks = tasks;
        project.fromEdit = true;
        project.cover = {
            changed: true,
            img: project.coverUrl,
            imgSrc: project.coverUrl,
        };
        if (project.situation.startDate) {
            project.situation.projectDates = {
                startDate: moment(
                    new Date(project.situation.startDate.seconds)
                ),
                endDate: moment(new Date(project.situation.endDate.seconds)),
            };
        }
        setLoading(false);
    }, [project.situation]);
    function nextStep() {
        if (step < 3) {
            setPercent((step * 100 + 100) / 3);
            setStep(step + 1);
        }
    }
    function prevStep() {
        if (step > 0) {
            setPercent((step * 100 - 100) / 3);
            setStep(step - 1);
        }
    }
    // function addSection(values) {
    // 	const newSections = [...project.results.sections, values];
    // 	const newProject = { ...project };
    // 	newProject.results.sections = newSections;
    // 	setProject(newProject);
    // }
    function editProjectDetails(values) {
        const newProject = { ...project };
        newProject.status = values.status;
        newProject.visibility = values.visibility;
        newProject.title = values.title;
        setProject(newProject);
    }
    function editSituation(values) {
        const newProject = { ...project };
        newProject.situation = values;
        setProject(newProject);
    }
    function editTasks(values) {
        const newProject = { ...project };
        newProject.tasks = values;
        setProject(newProject);
    }
    function editResults(values) {
        const newProject = { ...project };
        newProject.results = values;
        setProject(newProject);
    }
    function editCover(event) {
        const newProject = { ...project };
        newProject.cover.imgSrc = event.target.files[0];
        newProject.cover.img = URL.createObjectURL(event.target.files[0]);
        setProject(newProject);
    }
    // function editSections(index, values) {
    //     const newSections = [...project.results.sections];
    //     newSections[index].description = values.description;
    //     newSections[index].sectionLink = values.sectionLink;
    //     newSections[index].files = values.files;
    //     const newProject = { ...project };
    //     newProject.results.sections[index] = newSections;
    //     setProject(newProject);
    // }
    const finishEditing = async () => {
        uploadProject(props.user.uid, project);
        history.push(`users/${props.user.uid}`);
        addSkillsTools(props.user, project);
    };
    if (loading === true) {
        return <span>Loading ...</span>;
    } else {
        return (
            <div className={styles.root}>
                <div className={styles.header}>
                    <div className={styles.button_row}>
                        <Button
                            id={"delProject"}
                            className={styles.delete_project}
                            iconR={<i className="far fa-trash-alt"></i>}
                            text="Delete project"
                            onClick={lockBg}
                        />
                        <div
                            className={popup.popupContainer}
                            id={"delProject_popContent"}
                        >
                            <Alert
                                id={"delProject"}
                                type="project"
                                hasConfirm
                                confirmBtnLabel="Yes, delete"
                                closeBtnLabel="No, go back"
                                onConfirm={() =>
                                    console.log("Khairi needs to do this")
                                }
                            />
                        </div>
                    </div>
                </div>
                <div
                    id={project.pid}
                    className={styles.project_title}
                    onClick={(e) => {
                        lockBg(e);
                    }}
                >
                    {project.title}
                </div>
                <div
                    id={project.pid + "_popContent"}
                    className={popup.popupContainer}
                >
                    <ProjectDetails
                        id={project.pid}
                        project={project}
                        editProjectDetails={editProjectDetails}
                    />
                </div>
                <div className={styles.title_help}>
                    Click on the title to edit project details.
                </div>
                <div className={styles.section}>
                    <Timeline
                        label={label}
                        percent={percent}
                        width={props.dims.width * 0.7}
                    />
                </div>

                {step === 0 && (
                    <div
                        className={`${styles.parent_form} ${styles.project_bg1}`}
                    >
                        <div className={styles.heading}>Situation</div>
                        <Situation
                            situation={project.situation}
                            nextStep={nextStep}
                            editSituation={editSituation}
                        />
                    </div>
                )}
                {step === 1 && (
                    <div
                        className={`${styles.parent_form} ${styles.project_bg2}`}
                    >
                        <div className={styles.heading}>Tasks & Actions</div>
                        <TasksActions
                            tasks={project.tasks}
                            // projectDates={project.situation.projectDates}
                            nextStep={nextStep}
                            prevStep={prevStep}
                            editTasks={editTasks}
                        />
                    </div>
                )}
                {step === 2 && (
                    <div
                        className={`${styles.parent_form} ${styles.project_bg3}`}
                    >
                        <div className={styles.heading}>Results</div>
                        <Results
                            results={project.results}
                            nextStep={nextStep}
                            nextText="Finish Editing"
                            prevStep={prevStep}
                            editResults={editResults}
                            // addSection={addSection}
                            // editSections={editSections}
                        />
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <div className={styles.heading}>Preview</div>
                        <Preview
                            project={project}
                            prevStep={prevStep}
                            editCover={editCover}
                            finishProject={finishEditing}
                        />
                    </div>
                )}
            </div>
        );
    }
}

const label = ["SITUATION", "TASKS & ACTIONS", "RESULTS", "PREVIEW"];

// error checking after the whole form
const ProjectForm = withFormik({
    mapPropsToValues: () => ({ name: "" }),

    // Custom sync validation
    validate: (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Required";
        }

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        console.log("submititng");
        setTimeout(() => {
            setSubmitting(false);
        }, 1000);
    },

    displayName: "ProjectForm",
})(EditProject);

export default connect(mapStateToProps)(withContext(ProjectForm));
