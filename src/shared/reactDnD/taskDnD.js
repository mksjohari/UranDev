import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "../../modules/DnD.module.scss";
import Button from "../../shared/sandbox/Button";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getActionStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
});

function TaskDnD(props) {
    const [taskList, setTaskList] = useState(props.data);
    const [currentTask, setCurrentTask] = useState(0); // index of currentTask object
    // console.log(taskList);
    const TaskCard = (props) => {
        return (
            <div className={styles.task_card}>
                <div
                    className={`${styles.card} ${
                        (props.snapshot.isDragging ||
                            props.index === currentTask) &&
                        styles.task_current
                    }`}
                >
                    <div className={styles.title}>
                        Task {props.index + 1}: {props.task.title}
                    </div>
                    <div className={styles.description}>
                        {props.task.description}
                    </div>
                    <div className={styles.task_footer}>
                        <Button
                            className={`${styles.duration_button}`}
                            iconL={<i className="far fa-calendar"></i>}
                            text="Task Duration"
                        />
                        {/* <Button
                            className={`${styles.edit_button}`}
                            iconL={<i className="fas fa-check"></i>}
                            text="Edit"
                        /> */}
                        <a className={styles.edit_button} href="##">
                            <i className="fas fa-edit"></i>
                            Edit
                        </a>
                    </div>
                </div>
                {props.index === currentTask && (
                    <div className={styles.task_chevron}>
                        <i className="fas fa-chevron-left"></i>
                    </div>
                )}
            </div>
        );
    };

    function addTask() {
        const newTask = {
            taskId: `task-${new Date().getTime()}`,
            title: "New Task",
            description: "",
            actionIds: [],
        };
        setTaskList([...taskList, newTask]);
    }
    function addAction() {
        const newAction = {
            actionId: `action-${new Date().getTime()}`,
            tools: [],
            skills: [],
            description: "",
        };
        const actionList = taskList[currentTask].actions;
        const newActionList = [...actionList, newAction];
        const newTaskList = [...taskList];
        newTaskList[currentTask].actions = newActionList;
        setTaskList(newTaskList);
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
        if (destination.droppableId === "TaskList") {
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
            console.log(newTaskList);
            setTaskList(newTaskList);
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.draggable_root}>
                <div className={styles.column}>
                    <Droppable droppableId="TaskList" type="TaskList">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                // style={{
                                //     background: snapshot.isDraggingOver
                                //         ? "#EDEDED"
                                //         : "transparent",
                                // }}
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
                                                    task={task}
                                                    index={index}
                                                    snapshot={snapshot}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                <button type="button" onClick={() => addTask()}>
                                    Add new task
                                </button>
                            </div>
                        )}
                    </Droppable>
                </div>
                <div className={`${styles.column} ${styles.action_col}`}>
                    <div className={styles.heading}>
                        Task {currentTask + 1}: {taskList[currentTask].title}
                    </div>

                    <Droppable droppableId="ActionList" type="ActionList">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={{
                                    background: snapshot.isDraggingOver
                                        ? "lightblue"
                                        : "lightgrey",
                                }}
                                {...provided.droppableProps}
                            >
                                {taskList[currentTask].actions.map(
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
                                                    style={getActionStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps
                                                            .style
                                                    )}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-around",
                                                        }}
                                                    >
                                                        {action.description}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteAction(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                )}
                                {provided.placeholder}
                                <button
                                    type="button"
                                    onClick={() => addAction()}
                                >
                                    Add new action
                                </button>
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    );
}

export default TaskDnD;
