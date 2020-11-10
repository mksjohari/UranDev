import React, { useState } from 'react';
import { Formik, Field } from 'formik';

import DateSelect from '../input/DateSelect';
import { lockBg } from '../sandbox/Popup';
import Alert from '../sandbox/Alert';
import Button from '../sandbox/Button';

import popup from '../../modules/popup.module.scss';
import styles from '../../modules/DnD.module.scss';

const TaskCard = (props) => {
	const [edit, setEdit] = useState(false);
	const deleteTask = () => props.deleteTask(props.index);

	const saveTask = () => {
		return (
			<Formik
				initialValues={{
					taskTitle: props.task.title,
					taskDescription: props.task.description,
				}}
				onSubmit={(values, actions) => {
					setTimeout(() => {
						props.editTask(props.index, values);
						actions.setSubmitting(false);
					}, 1000);
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
								id={'delTask'}
								iconL={<i className="fas fa-trash-alt"></i>}
								text="Delete task"
								onClick={lockBg}
							/>
							<div
								className={popup.popupContainer}
								id={'delTask_popContent'}
							>
								<Alert
									id={'delTask'}
									type="task"
									hasConfirm
									confirmBtnLabel="Yes, delete"
									closeBtnLabel="No, go back"
									onConfirm={deleteTask}
								/>
							</div>
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
					onSubmit={async (values) => {
						await new Promise((r) => setTimeout(r, 500));
						// alert(JSON.stringify(values, null, 2));
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
											setFieldValue('taskDates', v)
										}
										isSubmittable
										onSubmit={props.handleSubmit}
									/>
								)}
							</Field>
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
