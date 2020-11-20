import React from "react";
import { useField } from "formik";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { lockBg } from "../sandbox/Popup";
import AddActionForm from "../../shared/input/ActionForm";
import Button from "../sandbox/Button";
import ActionCard from "./action";

import styles from "../../modules/DnD.module.scss";
import popup from "../../modules/popup.module.scss";

const newAction = {
    actionId: `action-${new Date().getTime()}`,
    title: "New Action",
    description: "",
    tools: [],
    skills: [],
    files: [],
};

const ActionDnD = (props) => {
    const [meta] = useField(`tasks[${props.currentTask}].actions`);
    const { form, push, remove, replace, move } = props.arrayHelpers;
    const { value } = meta;
    console.log(form);

    function onDragEnd(result) {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        // droped into its own list
        else if (destination.droppableId === "ActionList") {
            move(source.index, destination.index);
        }
    }
    function onDragStart(result) {
        const { source } = result;
    }

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Droppable droppableId="ActionList" type="ActionList">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        className={styles.action_col}
                        {...provided.droppableProps}
                    >
                        {!props.switching &&
                            value.map((action, index) => (
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
                                                id={action.actionId}
                                                index={index}
                                                action={action}
                                                currentTask={props.currentTask}
                                                snapshot={snapshot}
                                                readOnly={props.readOnly}
                                                errors={form.errors.tasks}
                                                deleteAction={() =>
                                                    remove(index)
                                                }
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        {provided.placeholder}
                        {!props.readOnly && (
                            <>
                                <Button
                                    id={"newAction"}
                                    className={styles.button_add_action}
                                    iconL={<i className="fas fa-plus"></i>}
                                    text="Add new action"
                                    onClick={(e) => {
                                        push(newAction);
                                        lockBg(e);
                                    }}
                                />
                                <div
                                    className={popup.popupContainer}
                                    id={"newAction_popContent"}
                                >
                                    <AddActionForm
                                        id={"newAction"}
                                        action={value[value.length - 1]}
                                        currentTask={props.currentTask}
                                        index={value.length - 1}
                                        newAction
                                    />
                                </div>
                            </>
                        )}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
export default ActionDnD;
