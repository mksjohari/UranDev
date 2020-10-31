import React, { useState } from "react";
import { Formik, Field, useField } from "formik";

import Button from "../sandbox/Button";
import { close } from "../sandbox/Popup";
import Droparea from "../sandbox/Droparea";

import styles from "../../modules/popup.module.scss";

function ResultSection(props) {
    const sectionId = props.newForm ? "newSection" : props.section.sectionId;

    return (
        <div className={styles.form_container}>
            <Formik
                initialValues={{
                    description: props.section.description,
                    sectionLink: props.section.sectionLink,
                    files: props.section.files,
                }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values));
                        props.onConfirm(values);
                        actions.setSubmitting(false);
                    }, 1000);
                }}
                render={({ values }) => (
                
                    <form
                        
                        className={styles.form}
                        style={{ width: window.innerWidth * 0.4 }}
                    >
                        <h3>Add Result Section</h3>
                        <div className={styles.toolsEdit}>
                            <label
                                htmlFor="description"
                                className={styles.subtitle}
                            >
                                Describe your section in detail. (Optional)
                            </label>

                            <Field
                                as="textarea"
                                name="description"
                                className={styles.descEdit}
                                placeholder="Write what this section is about ..."
                            />
                            <br />
                            <label
                                htmlFor="sectionLink"
                                className={styles.subtitle}
                            >
                                Add an link to external sources.
                            </label>
                            <div className={styles.section_input_row}>
                                <Field
                                    as="input"
                                    className={`inp-field ${styles.input_link}`}
                                    name={`sectionLink.url`}
                                    placeholder="URL"
                                />
                                <Field
                                    as="input"
                                    className={`inp-field ${styles.input_link}`}
                                    name={`sectionLink.linkName`}
                                    placeholder="link name (optional)"
                                />
                            </div>
                            <br />
                            <label htmlFor="title" className={styles.subtitle}>
                                Upload at most 3 files to showcase your work
                                (.mp4, .png, .jpeg)
                            </label>

                            <Field as={Droparea} name="files" />
                        </div>
                        <br />
                        <div className={styles.btnsRow}>
                            <Button
                                type="submit"
                                text="Confirm"
                                id={sectionId + "_confirm"}
                                colour="reddo"
                                iconR={<i className="fas fa-check"></i>}
                                onClick={(e) => {
                                    // props.submitForm();
                                    close(e, "_confirm");
                                }}
                            />
                            <Button
                                id={sectionId + "_close"}
                                text="Cancel"
                                // iconR={<i className="fas fa-times"></i>}
                                onClick={(e) => close(e, "_close")}
                            />
                        </div>
                    </form>
                )}
            />
        </div>
    );
}

export default ResultSection;
