import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Button from '../sandbox/Button';
import ActionCard from './action';
import TaskCard from './task';
import AddActionForm from '../input/AddActionForm';

import popup from "../../modules/popup.module.scss";
import styles from "../../modules/DnD.module.scss";
import { lockBg } from "../sandbox/Popup";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

function TaskDnD(props) {
    const taskList = props.data;
    const [currentTask, setCurrentTask] = useState(0); // index of currentTask object
    const [switching, setSwitch] = useState(false); // index of currentTask object
    useEffect(() => {
        setCurrentTask(0);
        setSwitch(false);
    }, [switching]);
    function addTask() {
        const newTask = {
            taskId: `task-${new Date().getTime()}`,
            title: "New Task",
            description: "",
            startDate: null,
            endDate: null,
            actions: [],
        };
        props.updateTasks([...taskList, newTask]);
    }
    function addAction(values, tools, skills) {
        const newAction = {
            actionId: `task-${new Date().getTime()}`,
            title: values.title,
            description: values.description,
            tools: tools,
            skills: skills,
            files: values.files,
        };
        const actionList = taskList[currentTask].actions;
        const newActionList = [...actionList, newAction];
        const newTaskList = [...taskList];
        newTaskList[currentTask].actions = newActionList;
        props.updateTasks(newTaskList);
    }
    function editTask(index, values) {
        const newTaskList = [...taskList];
        newTaskList[index].title = values.taskTitle;
        newTaskList[index].description = values.taskDescription;
        props.updateTasks(newTaskList);
    }
    function setTaskDates(index, dates) {
        const newTaskList = [...taskList];
        newTaskList[index].startDate = dates.startDate;
        newTaskList[index].endDate = dates.endDate;
        props.updateTasks(newTaskList);
    }
    function editAction(index, values, tools, skills) {
        const newActionList = taskList[currentTask].actions;
        newActionList[index].title = values.title;
        newActionList[index].description = values.description;
        newActionList[index].tools = tools;
        newActionList[index].skills = skills;
        newActionList[index].files = values.files;
        const newTaskList = [...taskList];
        newTaskList[currentTask].actions = newActionList;
        props.updateTasks(newTaskList);
    }
    function deleteTask(index) {
        setSwitch(true);
        const newTaskList = [...taskList];
        newTaskList.splice(index, 1);
        props.updateTasks(newTaskList);
    }
    function deleteAction(index) {
        const newActionList = taskList[currentTask].actions;
        newActionList.splice(index, 1);
        const newTaskList = [...taskList];
        newTaskList[currentTask].actions = newActionList;
        props.updateTasks(newTaskList);
        // props.updateTasks(newTaskList.filter((task) => task.actions.length));
    }
    function onDragEnd(result) {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        // droped into its own list
        if (destination.droppableId === "TaskList") {
            const newTaskList = reorder(
                taskList,
                source.index,
                destination.index
            );
            props.updateTasks(newTaskList);
            setCurrentTask(destination.index);
        } else {
            const newActionList = reorder(
                taskList[currentTask].actions,
                source.index,
                destination.index
            );
            const newTaskList = [...taskList];
            newTaskList[currentTask].actions = newActionList;
            props.updateTasks(newTaskList);
        }
    }
    function onDragStart(result) {
        const { source } = result;
        setCurrentTask(source.index);
    }
    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
                                        isDragDisabled={props.readOnly}
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
                                                    task={task}
                                                    index={index}
                                                    snapshot={snapshot}
                                                    readOnly={props.readOnly}
                                                    currentTask={currentTask}
                                                    editTask={(v) =>
                                                        editTask(index, v)
                                                    }
                                                    setTaskDates={(v) =>
                                                        setTaskDates(index, v)
                                                    }
                                                    deleteTask={
                                                        taskList.length > 1
                                                            ? () =>
                                                                  deleteTask(
                                                                      index
                                                                  )
                                                            : null
                                                    }
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                {!props.readOnly && (
                                    <Button
                                        className={styles.button_add_task}
                                        iconL={<i className="fas fa-plus"></i>}
                                        text="Add new task"
                                        onClick={() => addTask()}
                                    />
                                )}
                            </div>
                        )}
                    </Droppable>
                </div>
                <div className={` ${styles.section_action}`}>
                    <div className={styles.heading}>
                        {!switching &&
                            `Task ${currentTask + 1}: ${
                                taskList[currentTask].title
                            }`}
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
                                                isDragDisabled={props.readOnly}
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
                                                            action={action}
                                                            snapshot={snapshot}
                                                            readOnly={
                                                                props.readOnly
                                                            }
                                                            editAction={(
                                                                v,
                                                                t,
                                                                s
                                                            ) =>
                                                                editAction(
                                                                    index,
                                                                    v,
                                                                    t,
                                                                    s
                                                                )
                                                            }
                                                            deleteAction={() =>
                                                                deleteAction(
                                                                    index
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    )}
                                {provided.placeholder}
                                {!props.readOnly && (
                                    <>
                                        <Button
                                            id={"newAction"}
                                            className={styles.button_add_action}
                                            iconL={
                                                <i className="fas fa-plus"></i>
                                            }
                                            text="Add new action"
                                            onClick={lockBg}
                                        />
                                        <div
                                            className={popup.popupContainer}
                                            id={"newAction_popContent"}
                                        >
                                            <AddActionForm
                                                id={"newAction"}
                                                action={newAction}
                                                editAction={addAction}
                                                newAction
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    );
}

export default TaskDnD;

const newAction = {
    // actionId: `action-${new Date().getTime()}`,
    title: "",
    tools: [],
    skills: [],
    description: "",
    files: [],
};
