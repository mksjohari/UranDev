import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from '../../modules/DnD.module.scss';

import Button from '../../shared/sandbox/Button';
import ActionCard from './action';
import TaskCard from './task';

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

function TaskDnD(props) {
	const [taskList, setTaskList] = useState(props.data);
	const [currentTask, setCurrentTask] = useState(0); // index of currentTask object
	const [switching, setSwitch] = useState(false); // index of currentTask object

	useEffect(() => {
		setCurrentTask(0);
		setSwitch(false);
	}, [switching]);
	function addTask() {
		const newTask = {
			taskId: `task-${new Date().getTime()}`,
			title: 'New Task',
			description: '',
			actionIds: [],
		};
		setTaskList([...taskList, newTask]);
	}
	function addAction() {
		const newAction = {
			actionId: `action-${new Date().getTime()}`,
			tools: [],
			skills: [],
			description: '',
		};
		const actionList = taskList[currentTask].actions;
		const newActionList = [...actionList, newAction];
		const newTaskList = [...taskList];
		newTaskList[currentTask].actions = newActionList;
		setTaskList(newTaskList);
	}
	function deleteTask(index) {
		if (taskList.length > 1) {
			setSwitch(true);
			const newTaskList = [...taskList];
			newTaskList.splice(index, 1);
			setTaskList(newTaskList);
		} else {
			console.log('Alert: Must have at least one task.');
		}
	}
	function deleteAction(index) {
		const newActionList = taskList[currentTask].actions;
		newActionList.splice(index, 1);
		const newTaskList = [...taskList];
		newTaskList[currentTask].actions = newActionList;
		setTaskList(newTaskList.filter((tasks) => tasks.actions.length));
	}
	function onDragEnd(result) {
		const { source, destination } = result;
		// dropped outside the list
		if (!destination) {
			return;
		}
		// droped into its own list
		if (destination.droppableId === 'TaskList') {
			const newTaskList = reorder(
				taskList,
				source.index,
				destination.index
			);
			setTaskList(newTaskList);
			setCurrentTask(destination.index);
		} else {
			const newActionList = reorder(
				taskList[currentTask].actions,
				source.index,
				destination.index
			);
			const newTaskList = [...taskList];
			newTaskList[currentTask].actions = newActionList;
			setTaskList(newTaskList);
		}
	}
	function onDragStart(result) {
		const { source, destination } = result;
		setCurrentTask(source.index);
	}
	return (
		<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
			<br />
			{'all taskes: ' + taskList.length}
			<br />

			{'current active: ' + currentTask}
			<br />

			{'switch: ' + switching}
			<div className={styles.draggable_root}>
				<div className={styles.section_task}>
					<Droppable droppableId="TaskList" type="TaskList">
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								className={styles.task_col}
								{...provided.droppableProps}
							>
								{taskList.map((task, index) => (
									<Draggable
										key={task.taskId}
										draggableId={task.taskId}
										index={index}
									>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												onClick={() =>
													setCurrentTask(index)
												}
											>
												<TaskCard
													key={task.taskId}
													index={index}
													task={task}
													snapshot={snapshot}
													currentTask={currentTask}
													deleteTask={() => {
														deleteTask(index);
													}}
												/>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
								<Button
									className={styles.button_add_task}
									iconL={<i className="far fa-plus"></i>}
									text="Add new task"
									onClick={() => addTask()}
								/>
							</div>
						)}
					</Droppable>
				</div>
				<div className={` ${styles.section_action}`}>
					<div className={styles.heading}>
						{/* Task {currentTask + 1}: {taskList[currentTask].title} */}
					</div>

					<Droppable droppableId="ActionList" type="ActionList">
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								className={styles.action_col}
								{...provided.droppableProps}
							>
								{!switching &&
									taskList[currentTask].actions.map(
										(action, index) => (
											<Draggable
												key={action.actionId}
												draggableId={action.actionId}
												index={index}
											>
												{(provided, snapshot) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<ActionCard
															key={
																action.actionId
															}
															index={index}
															action={action}
															snapshot={snapshot}
															delete={
																deleteAction
															}
														/>
													</div>
												)}
											</Draggable>
										)
									)}
								{provided.placeholder}
								<Button
									className={styles.button_add_action}
									iconL={<i className="far fa-plus"></i>}
									text="Add new action"
									onClick={() => addAction()}
								/>
							</div>
						)}
					</Droppable>
				</div>
			</div>
		</DragDropContext>
	);
}

export default TaskDnD;