import React, { useState } from 'react';

import TaskDnD from '../../shared/reactDnD/taskDnD';
import Button from '../../shared/sandbox/Button';
import { withContext } from '../../shared/react-dims';
import styles from '../../modules/createProject.module.scss';

function TasksActions(props) {
	const [hasDates, setHasDates] = useState(false);
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

				<TaskDnD data={props.tasks} updateTasks={props.editTasks} />
			</div>
			<div className={styles.button_footer}>
				<Button
					iconL={<i className="fas fa-arrow-left" />}
					text="Back"
					onClick={props.prevStep}
				/>
				<Button
					type="submit"
					className={styles.save_draft}
					iconR={<i className="fas fa-arrow-right" />}
					text="Next"
					onClick={props.nextStep}
				/>
			</div>
		</div>
	);
}
export default withContext(TasksActions);
