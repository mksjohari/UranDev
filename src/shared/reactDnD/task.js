import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Formik, Field, useField } from "formik";

import DateSelect from "../../shared/DateSelect";
import Popup from "../../shared/sandbox/popup";
import Alert from "../sandbox/alert";
import styles from "../../modules/DnD.module.scss";

const TaskCard = (props) => {
    const [edit, setEdit] = useState(false);
    return (
        <div className={styles.task_card}>
            {/* <Formik
            initialValues={{
                situation: props.form.situation,
                role: props.form.role,
                teamSize: props.form.teamSize,
                budget: props.form.budget,
                currency: props.form.currency,
            }}
            // onSubmit={async (values) => {
            //     await new Promise((r) => setTimeout(r, 500));
            //     alert(JSON.stringify(values, null, 2));
            //     props.setProject(values);
            //     props.nextStep();
            // }}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    props.setProject(values);
                    props.nextStep();
                    actions.setSubmitting(false);
                }, 1000);
            }}
        >
            {(props) => (
                <form onSubmit={props.handleSubmit}>
                    <div className={styles.section_input}>
                        <label
                            htmlFor="situation"
                            className={styles.section_question}
                        >
                            What is the problem space/goal of your project?
                            {` `}
                            What inspired you to start this project?
                            {` `}
                            Give a brief summary of your project's background.
                        </label>
                        <Field
                            as="textarea"
                            className={`inp-field ${styles.input_situation}`}
                            name="situation"
                            placeholder="Type here"
                        />
                    </div>
                    <Button
                        type="submit"
                        className={styles.save_draft}
                        iconR={<i className="fas fa-arrow-right" />}
                        text="Next"
                        onClick={props.submitForm}
                    />
                </form>
            )}
        </Formik> */}

            <div
                className={`${styles.card} ${
                    props.index === props.currentTask &&
                    !props.snapshot.isDragging &&
                    styles.task_current
                } ${props.snapshot.isDragging && styles.task_dragging}`}
            >
                <div className={styles.title}>
                    Task {props.index + 1}: {props.task.title}
                </div>
                <div className={styles.description_title}>
                    {props.task.description}
                </div>
                <div className={styles.task_footer}>
                    {/* <Button
                        className={`${styles.duration_button}`}
                        iconL={<i className="far fa-calendar"></i>}
                        text="Task Duration"
                    /> */}

                    {/* <DateSelect /> */}
                    {/* <Button
                        className={`${styles.delete_button}`}
                        iconL={<i className="far fa-calendar"></i>}
                        text="Delete task"
                    /> */}
                    {edit ? (
                        <Popup
                            BtnText="Delete Task"
                            BtnColour="reddo"
                            BtnId="delTask"
                            BtnIconR={<i className="fas fa-trash-alt"></i>}
                            contentBGColour={"white"}
                            closeBtnLabel="No, go back"
                            hasConfirm
                            confirmBtnLabel="Yes, delete"
                            onConfirm={() =>
                                props.deleteTask()
                            }
                            width={500}
                            content={<Alert id="delTask" type="task" />}
                        />
                    ) : (
                        <DateSelect />
                    )}
                    {edit ? (
                        <NavLink
                            className={styles.edit_button}
                            to="#"
                            onClick={() => setEdit(false)}
                        >
                            <i className="fas fa-check"></i>
                            <div className={styles.text_button}>Save</div>
                        </NavLink>
                    ) : (
                        <NavLink
                            className={styles.edit_button}
                            to="#"
                            onClick={() => setEdit(true)}
                        >
                            <i className="fas fa-edit"></i>
                            <div className={styles.text_button}>Edit</div>
                        </NavLink>
                    )}
                </div>
            </div>
            {props.index === props.currentTask && (
                <div className={styles.task_chevron}>
                    <i className="fas fa-chevron-left"></i>
                </div>
            )}
        </div>
    );
};
export default TaskCard;
