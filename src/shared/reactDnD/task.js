import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Formik, Field } from "formik";

import DateSelect from "../input/DateSelect";
import Popup from "../sandbox/Popup";
import Alert from "../sandbox/Alert";
import Button from "../sandbox/Button";
import styles from "../../modules/DnD.module.scss";

const TaskCard = (props) => {
    const [edit, setEdit] = useState(false);
    const deleteTask = () => props.deleteTask(props.index);

    // console.log(props)
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
                    <form onSubmit={props.handleSubmit} className={styles.form}>
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
                                onConfirm={deleteTask}
                                width={500}
                                content={<Alert id="delTask" type="task" />}
                            />
                            <Button
                                iconL={<i className="fas fa-check"></i>}
                                text="Save"
                                onClick={() => {
                                    props.submitForm();
                                    setEdit(false);
                                }}
                            />
                        </div>
                    </form>
                )}
            </Formik>
        );
    };
    const viewTask = () => {
        return (
            <div className={styles.form}>
                <div className={styles.title}>
                    Task {props.index + 1}: {props.task.title}
                </div>
                <div className={styles.description_title}>
                    {props.task.description}
                </div>
                <Formik
                    initialValues={{
                        taskDates: {
                            startDate: props.task.startDate,
                            endDate: props.task.endDate,
                        },
                    }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        alert(JSON.stringify(values, null, 2));
                        props.setTaskDates(props.index, values);
                    }}
                >
                    {(props) => (
                        <form
                            onSubmit={props.handleSubmit}
                            className={styles.task_footer}
                        >
                            <Field name="taskDates">
                                {({
                                    field: { value },
                                    form: { setFieldValue },
                                }) => (
                                    <DateSelect
                                        value={value}
                                        handleClick={(v) =>
                                            setFieldValue("taskDates", v)
                                        }
                                        onSubmit={props.handleSubmit}
                                    />
                                )}
                            </Field>
                        </form>
                    )}
                </Formik>
                <Button
                    className={styles.edit_button}
                    iconL={<i className="fas fa-edit"></i>}
                    text="Edit task"
                    onClick={() => setEdit(true)}
                />
                {/* <NavLink
                        className={styles.edit_button}
                        to="#"
                        onClick={() => setEdit(true)}
                    >
                        <i className="fas fa-edit"></i>
                        <div className={styles.text_button}>Edit</div>
                    </NavLink> */}
            </div>
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
                {edit ? saveTask() : viewTask()}
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
