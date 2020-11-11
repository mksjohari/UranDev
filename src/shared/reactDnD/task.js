import React, { useState } from "react";
import { Formik, Field } from "formik";

import DateSelect from "../input/DateSelect";
import { lockBg } from "../sandbox/Popup";
import Alert from "../sandbox/Alert";
import Button from "../sandbox/Button";

import popup from "../../modules/popup.module.scss";
import styles from "../../modules/DnD.module.scss";

const TaskCard = (props) => {
    const [edit, setEdit] = useState(props.newTask);
    const deleteTask = props.deleteTask;

    const saveTask = () => {
        return (
            <Formik
                initialValues={{
                    taskTitle: props.task.title,
                    taskDescription: props.task.description,
                }}
                validate={validateTask}
                onSubmit={(values, actions) => {
                    props.editTask(values);
                    actions.setSubmitting(false);
                    setEdit(false);
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit} className={styles.form}>
                        <div className={styles.col_input}>
                            <label
                                htmlFor="taskTitle"
                                className={styles.action_subtitle}
                            >
                                Task title:
                            </label>
                            <Field
                                as="input"
                                name="taskTitle"
                                className={`${styles.title} inp-field`}
                                placeholder="New task title"
                            />
                            {props.errors.taskTitle ? (
                                <div className={styles.error}>
                                    {props.errors.taskTitle}
                                </div>
                            ) : null}
                            <br />
                            <label
                                htmlFor="taskTitle"
                                className={styles.action_subtitle}
                            >
                                Task description:
                            </label>
                            <Field
                                as="textarea"
                                name="taskDescription"
                                className={`${styles.description_textbox} inp-field`}
                                placeholder="Give this task a summary."
                            />
                        </div>
                        <div className={styles.task_footer}>
                            <Button
                                colour="reddo"
                                id={"delTask"}
                                iconL={<i className="fas fa-trash-alt"></i>}
                                text="Delete task"
                                onClick={lockBg}
                            />
                            <div
                                className={popup.popupContainer}
                                id={"delTask_popContent"}
                            >
                                {deleteTask ? (
                                    <Alert
                                        id={"delTask"}
                                        type="task"
                                        hasConfirm
                                        confirmBtnLabel="Yes, delete"
                                        closeBtnLabel="No, go back"
                                        onConfirm={deleteTask}
                                    />
                                ) : (
                                    <Alert
                                        id={"delTask"}
                                        type="task"
                                        heading="Task can't be deleted"
                                        message="Opps! A project must have at least one task."
                                        closeBtnLabel="Ok, go back"
                                    />
                                )}
                            </div>
                            <Button
                                iconL={<i className="fas fa-check"></i>}
                                text="Save"
                                onClick={() => {
                                    props.submitForm();
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
                <div className={styles.description_action}>
                    {props.task.description}
                </div>
                <Formik
                    initialValues={{
                        taskDates: {
                            startDate: props.task.startDate,
                            endDate: props.task.endDate,
                        },
                    }}
                    validate={validateTaskDates}
                    onSubmit={(values) => {
                        // alert(JSON.stringify(values, null, 2));
                        props.setTaskDates(values);
                    }}
                >
                    {(props) => (
                        <form
                            onSubmit={props.handleSubmit}
                            className={styles.task_footer}
                        >	<div className={popup.root_column}>
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
                                        isSubmittable
                                        onSubmit={props.handleSubmit}
                                    />
                                )}
                            </Field>
                            {props.errors.taskDates ? (
                                <div className={styles.error}>
                                    {props.errors.taskDates}
                                </div>
                            ) : null}
							</div>
                        </form>
                    )}
                </Formik>
                {props.index === props.currentTask && (
                    <Button
                        className={styles.edit_button}
                        iconL={<i className="fas fa-edit"></i>}
                        text="Edit task"
                        onClick={() => setEdit(true)}
                    />
                )}
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
                {props.index === props.currentTask && edit
                    ? saveTask()
                    : viewTask()}
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

const validateTask = (
    values,
    props /* only available when using withFormik */
) => {
    const errors = {};

    if (!values.taskTitle) {
        errors.taskTitle = "Please enter a task title.";
    }

    return errors;
};

const validateTaskDates = (
    values,
    props /* only available when using withFormik */
) => {
    const errors = {};

    if (!values.taskDates.startDate && !values.taskDates.endDate) {
    } else {
        if (!values.taskDates.startDate | !values.taskDates.endDate) {
            errors.taskDates = "Please enter valid task dates.";
        }
    }

    return errors;
};
