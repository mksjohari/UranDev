import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, useField, withFormik } from "formik";
import { withContext } from "../../shared/react-dims";

import Button from "../../shared/sandbox/Button";
import Dropdown from "../../shared/sandbox/Dropdown";
import Timeline from "../../shared/sandbox/Timeline";
import Situation from "./situation";
import TasksActions from "./tasksActions";
import PreviewProject from "./previewProject";
import { lockBg } from "../../shared/sandbox/Popup";
import ProjectDetails from "../../shared/input/ProjectDetails";

import popup from "../../modules/popup.module.scss";
import styles from "../../modules/createProject.module.scss";

const projectData = {
    projectId: `project-${new Date().getTime()}`,
    status: "Ongoing",
    sharing: "Public",
    title: "New project",
    situation: null,
    tasks: [],
    results: null,
};

function CreateProject(props) {
    const [percent, setPercent] = useState(0);
    const [step, setStep] = useState(0);
    const [project, setProject] = useState(projectData);

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    function nextStep(props) {
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
    function editProjectDetails(values) {
        const newProject = {...project};
        newProject.status = values.status;
        newProject.sharing = values.sharing;
        newProject.title = values.title;
        setProject(newProject);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.root}>
                <div className={styles.header}>
                    <div className={styles.button_header}>
                        <Button
                            type="submit"
                            className={styles.save_draft}
                            iconR={<i className="far fa-save"></i>}
                            text="Save draft"
                        />
                        <Button
                            className={styles.delete_project}
                            iconR={<i className="far fa-trash-alt"></i>}
                            text="Delete project"
                        />
                    </div>
                </div>
                <div
                    id={project.projectId}
                    className={styles.project_title}
                    onClick={lockBg}
                >
                    {project.title}
                </div>
                <div
                    id={project.projectId + "_popContent"}
                    className={popup.popupContainer}
                >
                    <ProjectDetails
                        id={project.projectId}
                        project={project}
                        editProjectDetails={editProjectDetails}
                    />
                </div>
                {/* <div className={styles.project_title}>Name of Project</div> */}
                <div className={styles.title_help}>
                    Click on the title to edit project name.
                </div>
                <div className={styles.section}>
                    <Timeline
                        label={label}
                        percent={percent}
                        width={props.dims.width * 0.7}
                    />
                </div>
                <div className={styles.heading}>Situation</div>
                {step === 0 && (
                    <div className={styles.form}>
                        <Situation
                            form={project}
                            nextStep={nextStep}
                            setProject={setProject}
                        />
                    </div>
                )}
                {step === 1 && (
                    <div className={styles.full_width}>
                        <TasksActions form={props} nextStep={nextStep} />
                    </div>
                )}
                {step === 3 && <PreviewProject />}
                {step !== 0 && (
                    <Button
                        iconL={<i className="fas fa-arrow-left" />}
                        text="Back"
                        onClick={prevStep}
                    />
                )}
                {<button type="submit">Submit</button>}
            </div>
        </form>
    );
}

const label = ["SITUATION", "TASKS & ACTIONS", "RESULTS", "PREVIEW"];

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
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: "ProjectForm",
})(CreateProject);

export default withContext(ProjectForm);
