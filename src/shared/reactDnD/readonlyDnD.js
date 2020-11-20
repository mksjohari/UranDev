import React, { useState } from 'react';

import ActionCard from './action';
import TaskCard from './task';

import styles from '../../modules/DnD.module.scss';

function ReadonlyDnD(props) {
	const taskList = props.data;
	const [currentTask, setCurrentTask] = useState(0); // index of currentTask object

	return (
		<div className={styles.draggable_root}>
			<div className={styles.section_task}>
				{taskList.map((task, index) => (
					<div onClick={() => setCurrentTask(index)}>
						<TaskCard
							key={task.tid}
							task={task}
							index={index}
							// snapshot={snapshot}
							readOnly
							// errors={form.errors.tasks}
							currentTask={currentTask}
							// deleteTask={
							// 	value.length > 1
							// 		? () => deleteTask(index)
							// 		: null
							// }
						/>
					</div>
				))}
			</div>
			<div className={` ${styles.section_action}`}>
				<div className={styles.heading}>
					{`Task ${currentTask + 1}: ${taskList[currentTask].title}`}
				</div>
				<div className={styles.action_col}>
					{taskList[currentTask].actions.map((action, index) => (
						<ActionCard
							id={action.actionId}
							index={index}
							action={action}
							currentTask={props.currentTask}
							// snapshot={snapshot}
							readOnly
							// errors={form.errors.tasks}
							// deleteAction={() => remove(index)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default ReadonlyDnD;
