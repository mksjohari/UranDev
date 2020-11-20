import React from 'react';
import { Formik, FieldArray } from 'formik';

import TaskDnD from '../../shared/reactDnD/taskDnD';
import Button from '../../shared/sandbox/Button';
import { withContext } from '../../shared/react-dims';
import styles from '../../modules/createProject.module.scss';

function TasksActions(props) {
	const prevStep = props.prevStep;
	const nextStep = props.nextStep;
	// const [hasDates, setHasDates] = useState(false);
	return (
		<div>
			<Formik
				initialValues={{
					tasks: props.tasks,
				}}
				validate={validateTaskActions}
				onSubmit={(values, actions) => {
					props.editTasks(values);
					alert(JSON.stringify(values, 2));
					actions.setSubmitting(false);
				}}
			>
				{(props) => (
					<form onSubmit={props.handleSubmit}>
						<div className={styles.section_input}>
							<label
								htmlFor="tasks"
								className={`${styles.section_question} ${styles.child_form}`}
							>
								This section highlights the general steps you
								took to complete your project and the skillsets
								obtained. The general steps will be the tasks
								you've completed. Break your tasks into smaller
								actions, outlining what you did and the skills
								you've learned.
							</label>
							<FieldArray name="tasks" component={TaskDnD} />
						</div>
						<div className={styles.button_footer}>
							<Button
								iconL={<i className="fas fa-arrow-left" />}
								text="Back"
								// onClick={props.prevStep}
								onClick={() => {
									props.handleSubmit();
									prevStep();
									console.log('back results');
								}}
							/>
							<Button
								className={styles.save_draft}
								iconR={<i className="fas fa-arrow-right" />}
								text="Next"
								// onClick={props.submitForm}
								onClick={() => {
									props.handleSubmit();
									nextStep();
								}}
							/>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
}
export default withContext(TasksActions);

const validateTaskActions = (values) => {
	const errors = {};
	values.tasks.forEach((task, index) => {
		if (!task.title) {
			errors.tasks = 'taskTitle';
		}
		if (!task.startDate && !task.endDate) {
		} else {
			if (!task.startDate | !task.endDate) {
				errors.tasks = 'taskDates';
				// console.log("error task dates");
			}
		}
		task.actions.forEach((action, index) => {
			if (!action.title) {
				errors.tasks = 'actionTitle';
			}
			if (!action.description) {
				errors.tasks = 'actionDescription';
			}
		});
	});

	return errors;
};
