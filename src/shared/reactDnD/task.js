import React, { useState } from "react";
import { Formik, Field } from "formik";

import DateSelect from "../input/DateSelect";
import { lockBg } from "../sandbox/Popup";
import Alert from "../sandbox/Alert";
import Button from "../sandbox/Button";

import popup from "../../modules/popup.module.scss";
import styles from "../../modules/DnD.module.scss";

const TaskCard = (props) => {
    const [edit, setEdit] = useState(false);
    const deleteTask = props.deleteTask;

    const saveTask = () => {
        return (
            <div className={styles.form}>
                <div className={styles.col_input}>
                    <label htmlFor="title" className={styles.action_subtitle}>
                        Task title:
                    </label>
                    <Field
                        as="input"
                        name={`tasks[${props.currentTask}].title`}
                        className={`${styles.title} inp-field`}
                        placeholder="New task title"
                    />
                    {/* {props.errors.taskTitle ? (
                        <div className={styles.error}>
                            {props.errors.taskTitle}
                        </div>
                    ) : null} */}
                    {props.errors && props.errors === "taskTitle" ? (
                        <div className={styles.error}>
                            Please enter a task title.
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
                        name={`tasks[${props.currentTask}].description`}
                        className={`${styles.description_textbox} inp-field`}
                        placeholder="Give this task a summary."
                    />
                    <br />
                    <label
                        htmlFor="taskDates"
                        className={styles.action_subtitle}
                    >
                        Task dates:
                    </label>
                    <div className={styles.root_column}>
                        <Field name={`tasks[${props.currentTask}]`}>
                            {({
                                field: { value },
                                form: { setFieldValue },
                            }) => (
                                <DateSelect
                                    value={value}
                                    handleClick={(v) => {
                                        setFieldValue(
                                            `tasks[${props.currentTask}].startDate`,
                                            v.startDate
                                        );
                                        setFieldValue(
                                            `tasks[${props.currentTask}].endDate`,
                                            v.endDate
                                        );
                                    }}
                                    // required
                                    // isSubmittable
                                    // onSubmit={props.handleSubmit}
                                />
                            )}
                        </Field>
                    </div>
                    {/* {props.errors.taskDates ? (
                        <div className={styles.error}>
                            {props.errors.taskDates}
                        </div>
                    ) : null} */}
                </div>
                {props.readOnly ? (
                    ""
                ) : (
                    <div className={styles.task_footer}>
                        {deleteTask ? (
                            <>
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
                                    <Alert
                                        id={"delTask"}
                                        type="task"
                                        hasConfirm
                                        confirmBtnLabel="Yes, delete"
                                        closeBtnLabel="No, go back"
                                        onConfirm={deleteTask}
                                    />
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                        <Button
                            iconL={<i className="fas fa-check"></i>}
                            text="Save"
                            onClick={() => setEdit(false)}
                        />
                    </div>
                )}
            </div>
        );
    };
    const viewTask = () => {
        console.log(props.task);
        return (
            <div className={styles.form}>
                <div className={styles.title}>
                    Task {props.index + 1}: {props.task.title}
                </div>
                <div className={styles.description_action}>
                    {props.task.description}
                </div>
                <div className={styles.root_column}>
                    {props.task.endDate && (
                        <DateSelect
                            disabled
                            value={{
                                startDate: props.task.startDate,
                                endDate: props.task.endDate,
                            }}
                        />
                    )}
                </div>
                {props.readOnly
                    ? ""
                    : props.index === props.currentTask && (
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
