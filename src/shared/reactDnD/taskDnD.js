import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "../../modules/DnD.module.scss";
import projects from "../../modules/projects.module.scss";
import Button from "../../shared/sandbox/Button";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

function TaskDnD(props) {
    const [taskList, setTaskList] = useState(props.data);
    const [currentTask, setCurrentTask] = useState(0); // index of currentTask object
    // console.log(taskList);
    const TaskCard = (props) => {
        return (
            <div className={styles.task_card}>
                <div
                    className={`${styles.card} ${
                        props.index === currentTask &&
                        !props.snapshot.isDragging &&
                        styles.task_current
                    } ${props.snapshot.isDragging && styles.task_dragging}`}
                >
                    <div className={styles.title}>
                        Task {props.index + 1}: {props.task.title}
                    </div>
                    <div className={styles.description_title}>
                        {props.task.description}
                    </div>
                    <div className={styles.task_footer}>
                        <Button
                            className={`${styles.duration_button}`}
                            iconL={<i className="far fa-calendar"></i>}
                            text="Task Duration"
                        />
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

    const ActionCard = (props) => {
        return (
            <div className={styles.action_card}>
                <div className={styles.title}>
                    Action {props.index + 1}: {props.action.title}
                </div>
                <div className={styles.description_action}>
                    {props.action.description}
                </div>
                <div className={styles.action_tags}>
                    {props.action.skills.length ? (
                        <div className={styles.action_files}>
                            Skills:
                            <div className={styles.col_right}>
                                <div className={styles.project_tags}>
                                    {props.action.skills.map((skill, index) => (
                                        <span
                                            className={`${projects.tag_type} ${projects.Skill}`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {props.action.tools.length ? (
                        <div className={styles.action_files}>
                            Tools:
                            <div className={styles.col_right}>
                                <div className={styles.project_tags}>
                                    {props.action.tools.map((tool, index) => (
                                        <span
                                            className={`${projects.tag_type} ${projects.Tool}`}
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    <div>
                        <div className={styles.action_files}>
                            Files:
                            <div className={styles.col_right}>
                                <div className={styles.project_tags}>
                                    <a className={styles.file_link} href="##">
                                        somepicture.jpg
                                    </a>
                                    <a className={styles.file_link} href="##">
                                        anotherfile.pdf
                                    </a>
                                    <a className={styles.file_link} href="##">
                                        anotherfile.pdf
                                    </a>
                                    <a className={styles.file_link} href="##">
                                        anotherfile.pdf
                                    </a>
                                    <a className={styles.file_link} href="##">
                                        anotherfile.pdf
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.task_footer}>
                    {/* <Button
                        className={`${styles.delete_button}`}
                        iconL={<i className="far fa-trash-alt"></i>}
                        text="Delete action"
                    /> */}
                    <div></div>
                    <a className={styles.edit_button} href="##">
                        <i className="fas fa-edit"></i>
                        Edit
                    </a>
                </div>
                {/* <button type="button" onClick={() => deleteAction(props.index)}>
                    delete
                </button> */}
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
                <div className={styles.section_task}>
                    <Droppable droppableId="TaskList" type="TaskList">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className={styles.task_col}
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
                        Task {currentTask + 1}: {taskList[currentTask].title}
                    </div>

                    <Droppable droppableId="ActionList" type="ActionList">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className={styles.action_col}
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
                                                    // style={getActionStyle(
                                                    //     snapshot.isDragging,
                                                    //     provided.draggableProps
                                                    //         .style
                                                    // )}
                                                >
                                                    <ActionCard
                                                        action={action}
                                                        index={index}
                                                        snapshot={snapshot}
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
