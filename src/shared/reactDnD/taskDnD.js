import React, { useState, useEffect } from "react";
import { useField, FieldArray } from "formik";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Button from "../sandbox/Button";
import TaskCard from "./task";
import ActionDnD from "./actionDnD";

import styles from "../../modules/DnD.module.scss";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
const newTask = {
    taskId: `task-${new Date().getTime()}`,
    title: "New Task",
    description: "",
    startDate: null,
    endDate: null,
    actions: [
        {
            actionId: `action-${Math.floor(Math.random() * Math.pow(10, 6))}`,
            title: "New action",
            tools: [],
            skills: [],
            description: "",
            files: [],
        },
    ],
};

function TaskDnD(props) {
    const [meta] = useField(props.name);
    const { form, push, remove, replace, move } = props;
    const { value } = meta;
    // console.log(form.errors);

    const [currentTask, setCurrentTask] = useState(0); // index of currentTask object
    const [switching, setSwitch] = useState(false); // index of currentTask object

    useEffect(() => {
        setCurrentTask(0);
        setSwitch(false);
    }, [switching]);

    function deleteTask(index) {
        setSwitch(true);
        remove(index);
    }

    function onDragEnd(result) {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        // droped into its own list
        else if (destination.droppableId === "TaskList") {
            move(source.index, destination.index);
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
                                {value.map((task, index) => (
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
                                                    errors={form.errors.tasks}
                                                    currentTask={currentTask}
                                                    deleteTask={
                                                        value.length > 1
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
                                        onClick={() => {
                                            push(newTask);
                                            setCurrentTask(value.length - 1);
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </Droppable>
                </div>
                <div className={` ${styles.section_action}`}>
                    <div className={styles.heading}>
                        {/* {console.log(value)} */}
                        {!switching &&
                            `Task ${currentTask + 1}: ${
                                value[currentTask].title
                            }`}
                    </div>
                    <FieldArray
                        name={`tasks[${currentTask}].actions`}
                        render={(arrayHelpers) => (
                            <ActionDnD
                                arrayHelpers={arrayHelpers}
                                currentTask={currentTask}
                                readOnly={props.readOnly}
                                switching={props.switching}
                                errors={form.errors.tasks}
                            />
                        )}
                    />
                </div>
            </div>
        </DragDropContext>
    );
}

export default TaskDnD;
