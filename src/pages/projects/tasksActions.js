import React from "react";
import { Formik, Field } from "formik";

import TaskDnD from "../../shared/reactDnD/taskDnD";
import Button from "../../shared/sandbox/Button";
import { withContext } from "../../shared/react-dims";
import styles from "../../modules/createProject.module.scss";

function TasksActions(props) {
    return (
        <div>
            <div className={styles.section_input}>
                <label htmlFor="tasks" className={styles.section_question}>
                    This section highlights the general steps you took to
                    complete your project and the skillsets obtained. The
                    general steps will be the tasks you've completed. Break your
                    tasks into smaller actions, outlining what you did and the
                    skills you've learned.
                </label>
                <TaskDnD
                    data={props.tasks}
                    updateTasks={props.editTasks}
                />
            </div>
            <Button
                type="submit"
                className={styles.save_draft}
                iconR={<i className="fas fa-arrow-right" />}
                text="Next"
                onClick={props.nextStep}
            />
        </div>
    );
}
export default withContext(TasksActions);
