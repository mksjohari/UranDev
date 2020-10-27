import React from "react";
import { Formik, Field } from "formik";

import Dropdown from "../sandbox/Dropdown";
import Button from "../sandbox/Button";
import { close } from "../sandbox/Popup";
import SegmentTab from "./SegmentTab";

import styles from "../../modules/popup.module.scss";

function ProjectDetails(props) {
    const projectId = props.project.projectId;

    return (
        <div className={styles.form_container}>
            <Formik
                initialValues={{
                    status: props.project.status,
                    sharing: props.project.sharing,
                    title: props.project.title,
                }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values));
                        props.editProjectDetails(values);
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {(props) => (
                    <form
                        onSubmit={props.handleSubmit}
                        className={styles.form}
                        style={{ width: window.innerWidth * 0.4 }}
                    >
                        <h3>Create Project</h3>
                        <div className={styles.toolsEdit}>
                            <label htmlFor="status" className={styles.subtitle}>
                                Project status:
                            </label>
                            <Field
                                as={SegmentTab}
                                options={["Ongoing", "Completed"]}
                                name="status"
                            />
                            <br />
                            <label htmlFor="sharing" className={styles.subtitle}>
                                Sharing:
                            </label>
                            <Field
                                as={SegmentTab}
                                options={["Public", "Unlisted"]}
                                name="sharing"
                            />
                            <br />
                            <label htmlFor="title" className={styles.subtitle}>
                                Give this project a title.
                            </label>
                            <Field
                                as="textarea"
                                name="title"
                                className={styles.descEdit}
                                placeholder="Title of your masterpiece..."
                            />
                        </div>
                        <br />
                        <div className={styles.btnsRow}>
                            <Button
                                text="Confirm"
                                id={projectId + "_confirm"}
                                colour="reddo"
                                iconR={<i className="fas fa-check"></i>}
                                onClick={(e) => {
                                    props.submitForm();
                                    close(e, "_confirm");
                                }}
                            />
                            <Button
                                id={projectId + "_close"}
                                text="Cancel"
                                // iconR={<i className="fas fa-times"></i>}
                                onClick={(e) => close(e, "_close")}
                            />
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default ProjectDetails;
