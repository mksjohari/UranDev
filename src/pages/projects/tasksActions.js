import React from "react";
import { Formik, Field } from "formik";

import TaskDnD from "../../shared/reactDnD/taskDnD";
import { taskData } from "../tmp/tmpTest";
import Button from "../../shared/sandbox/Button";
import { withContext } from "../../shared/react-dims";
import styles from "../../modules/createProject.module.scss";

function tasksActions(props) {
    return (
        <Formik
            initialValues={{
                tasks: props.tasks,
            }}
            // onSubmit={async (values) => {
            //     await new Promise((r) => setTimeout(r, 500));
            //     alert(JSON.stringify(values, null, 2));
            //     props.setProject(values);
            //     props.nextStep();
            // }}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2));
                    props.editTasks(values);
                    props.nextStep();
                    actions.setSubmitting(false);
                }, 1000);
            }}
        >
            {(props) => (
                <form onSubmit={props.handleSubmit}>
                    <div className={styles.section_input}>
                        <label
                            htmlFor="tasks"
                            className={styles.section_question}
                        >
                            This section highlights the general steps you took
                            to complete your project and the skillsets obtained.
                            The general steps will be the tasks you've
                            completed. Break your tasks into smaller actions,
                            outlining what you did and the skills you've
                            learned.
                        </label>
                        <Field name="tasks">
                            {({
                                field: { value },
                                form: { setFieldValue },
                            }) => (
                                <TaskDnD
                                    data={value}
                                    handleClick={(v) =>
                                        setFieldValue("tasks", v)
                                    }
                                />
                            )}
                        </Field>
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
        </Formik>
    );
}
export default withContext(tasksActions);
