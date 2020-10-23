import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Field, useField } from 'formik';

import DateSelect from '../../shared/DateSelect';
import Popup from '../../shared/sandbox/popup';
import Alert from '../sandbox/Alert';
import styles from '../../modules/DnD.module.scss';

const TaskCard = (props) => {
	const [edit, setEdit] = useState(false);
	const saveTask = (submit) => {
		return (
			<div className={styles.task_footer}>
				<Popup
					BtnText="Delete Task"
					BtnColour="reddo"
					BtnId="delTask"
					BtnIconR={<i className="fas fa-trash-alt"></i>}
					contentBGColour={'white'}
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
						setEdit(false);
						submit();
					}}
				>
					<i className="fas fa-check"></i>
					<div className={styles.text_button}>Save</div>
				</NavLink>
			</div>
		);
	};
	const editTask = () => {
		return (
			<div className={styles.task_footer}>
				<DateSelect />
				<NavLink
					className={styles.edit_button}
					to="#"
					onClick={() => setEdit(true)}
				>
					<i className="fas fa-edit"></i>
					<div className={styles.text_button}>Edit</div>
				</NavLink>
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
				<Formik
					initialValues={{
						taskTitle: props.task.title,
						taskDescription: props.task.description,
					}}
					onSubmit={(values, actions) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							// props.setProject(values);
							actions.setSubmitting(false);
						}, 1000);
					}}
				>
					{(props) => (
						<form onSubmit={props.handleSubmit}>
							<Field
								as="input"
								name="taskTitle"
								className={styles.title}
								placeholder="New task title"
							/>
							<Field
								as="textarea"
								name="taskDescription"
								className={styles.description_title}
								placeholder="Give this task a summary."
							/>
							{edit ? saveTask(props.submitForm) : editTask()}
						</form>
					)}
				</Formik>
				<div className={styles.title}>
					Task {props.index + 1}: {props.task.title}
				</div>
				<div className={styles.description_title}>
					{props.task.description}
				</div>
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
