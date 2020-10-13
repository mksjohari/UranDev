import React from "react";
import { Formik, Field } from "formik";

import TaskDnD from "../../shared/reactDnD/taskDnD";
import {taskData} from "../tmp/tmpTest";
import Button from "../../shared/sandbox/Button";
import { withContext } from "../../shared/react-dims";
import styles from "../../modules/createProject.module.scss";

function tasksActions(props) {
    console.log(props);
    return (
        <Formik
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
                        <TaskDnD data={taskData}/>
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
        </Formik>
    );
}
export default withContext(tasksActions);