import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Field, useField } from 'formik';

import DateSelect from "../../shared/input/DateSelect";
import Popup from "../../shared/sandbox/popup";
import Alert from "../sandbox/alert";
import styles from "../../modules/DnD.module.scss";

const TaskCard = (props) => {
    const [edit, setEdit] = useState(false);
    // console.log(props.index)
    const saveTask = () => {
        return (
            <Formik
                initialValues={{
                    taskTitle: props.task.title,
                    taskDescription: props.task.description,
                }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        props.editTask(props.index, values);
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <div className={styles.col_input}>
                            <label htmlFor="taskTitle" className={styles.title}>
                                Task title:
                            </label>
                            <Field
                                as="input"
                                name="taskTitle"
                                className={`${styles.title} ${styles.text_input}`}
                                placeholder="New task title"
                            />
                            <br />
                            <label
                                htmlFor="taskTitle"
                                className={styles.description_title}
                            >
                                Task description:
                            </label>
                            <Field
                                as="textarea"
                                name="taskDescription"
                                className={`${styles.description_title} ${styles.text_input}`}
                                placeholder="Give this task a summary."
                            />
                            <label
                                htmlFor="taskTitle"
                                className={styles.description_title}
                            >
                                Task duration:
                            </label>
                            <DateSelect />
                        </div>
                        <div className={styles.task_footer}>
                            <Popup
                                BtnText="Delete Task"
                                BtnColour="reddo"
                                BtnId="delTask"
                                BtnIconR={<i className="fas fa-trash-alt"></i>}
                                contentBGColour={"white"}
                                closeBtnLabel="No, go back"
                                hasConfirm
                                confirmBtnLabel="Yes, delete"
                                onConfirm={props.deleteTask}
                                width={500}
                                content={<Alert id="delTask" type="task" />}
                            />
                            {/* <button onClick={() => props.deleteTask(props.index)}/> */}
                            <NavLink
                                className={styles.edit_button}
                                to="#"
                                onClick={() => {
                                    props.submitForm()
                                    setEdit(false);
                                }}
                            >
                                <i className="fas fa-check"></i>
                                <div className={styles.text_button}>Save</div>
                            </NavLink>
                        </div>
                    </form>
                )}
            </Formik>
        );
    };
    const editTask = () => {
        return (
            <>
                <div className={styles.title}>
                    Task {props.index + 1}: {props.task.title}
                </div>
                <div className={styles.description_title}>
                    {props.task.description}
                </div>
                <div className={styles.task_footer}>
                    <div></div>
                    <NavLink
                        className={styles.edit_button}
                        to="#"
                        onClick={() => setEdit(true)}
                    >
                        <i className="fas fa-edit"></i>
                        <div className={styles.text_button}>Edit</div>
                    </NavLink>
                </div>
            </>
        );
    };
    return (
        <div className={styles.task_card}>
            <div
                className={`${styles.card} ${
                    props.index === props.currentTask &&
                    !props.snapshot.isDragging &&
                    styles.task_current
                } ${props.snapshot.isDragging && styles.task_dragging}`}
            >
                {edit ? saveTask() : editTask()}
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
