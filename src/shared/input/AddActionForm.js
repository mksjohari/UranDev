import React from "react";
import { Formik, Field } from "formik";

import Dropdown from "../../shared/sandbox/Dropdown";
import Button from "../../shared/sandbox/Button";
import { close } from "../sandbox/Popup";
import Droparea from "../sandbox/Droparea";

import styles from "../../modules/popup.module.scss";

const dropdownConverter = (data) => {
    const output = [];
    if (data.length) {
        data.map((item, index) =>
            item.value ? output.push(item.value) : output.push(item)
        );
    }
    return output;
};

function AddActionForm(props) {
    const actionId = props.action.actionId;

    return (
        <div className={styles.form_container}>
            <Formik
                initialValues={{
                    title: props.action.title,
                    tools: props.action.tools,
                    skills: props.action.skills,
                    description: props.action.description,
                    files: props.action.files,
                }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        const tools = dropdownConverter(values.tools);
                        const skills = dropdownConverter(values.skills);
                        props.editAction(props.index, values, tools, skills);
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {(props) => (
                    <form
                        onSubmit={props.handleSubmit}
                        className={styles.form}
                    >
                        <h3>Add Action</h3>
                        <div className={styles.toolsEdit}>
                            <label htmlFor="tools" className={styles.subtitle}>
                                What tool(s) did you use?
                            </label>
                            <Field name="tools">
                                {({
                                    field: { value },
                                    form: { setFieldValue },
                                }) => (
                                    <Dropdown
                                        id={actionId + "_tools"}
                                        options={Options.tools}
                                        isMulti
                                        isCreatable
                                        colour="white"
                                        defaultValue={value.map((tool) => ({
                                            value: tool,
                                            label: tool,
                                        }))}
                                        keyColour="#AFDEE9"
                                        onChange={(v) =>
                                            setFieldValue("tools", v)
                                        }
                                    />
                                )}
                            </Field>
                            <br />
                            <label htmlFor="skills" className={styles.subtitle}>
                                What Skill(s) allowed you to do this?
                            </label>
                            <Field name="skills">
                                {({
                                    field: { value },
                                    form: { setFieldValue },
                                }) => (
                                    <Dropdown
                                        id={actionId + "_tools"}
                                        options={Options.skills}
                                        isMulti
                                        isCreatable
                                        colour="white"
                                        defaultValue={value.map((skill) => ({
                                            value: skill,
                                            label: skill,
                                        }))}
                                        onChange={(v) =>
                                            setFieldValue("skills", v)
                                        }
                                    />
                                )}
                            </Field>
                            <br />
                            <label
                                htmlFor="description"
                                className={styles.subtitle}
                            >
                                Describe your action in detail. (Optional)
                            </label>
                            <Field
                                as="textarea"
                                name="description"
                                className={styles.descEdit}
                                placeholder="Give this action a description."
                            />
                            <br />
                            <label htmlFor="files" className={styles.subtitle}>
                                Add files to show your work in progress.
                                (Optional, max 10 files)
                            </label>
                            <Field as={Droparea} name="files" />
                        </div>
                        <br />
                        <div className={styles.btnsRow}>
                            <Button
                                text="Confirm"
                                id={actionId + "_confirm"}
                                colour="reddo"
                                iconR={<i className="fas fa-check"></i>}
                                onClick={(e) => {
                                    props.submitForm();
                                    close(e, "_confirm");
                                }}
                            />
                            <Button
                                id={actionId + "_close"}
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

export default AddActionForm;

const Options = {
    tools: [
        { value: "tool", label: "git" },
        { value: "tool", label: "weh" },
        { value: "tool", label: "MATLAB" },
        { value: "tool", label: "adobe XD" },
        { value: "tool", label: "Rhino3D" },
        { value: "tool", label: "react" },
    ],
    skills: [
        { value: "skill", label: "web dev" },
        { value: "skill", label: "app design" },
        { value: "skill", label: "number theory" },
    ],
};
