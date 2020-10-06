import React, { Component, PureComponent, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import ActionCard from "./ActionCard";
import Button from "./sandbox/Button"
import styles from "../modules/tmp.module.scss";

// selective rendering to save computation timee
class InnerList extends PureComponent {

    render () {
        return (
            this.props.tasks.map((task, index) => (
                <ActionCard key={task.id} task={task} index={index}/>
            )) 
        )
    }

}

// add button?
class AddActionBtn extends Component {
    render () {
        return (
            <button className={styles.addBtn}>
                <i class="fas fa-plus"></i>
            </button>
        )
    }
}

// add action
function AddAction(key, task, index) {
    return;
}

class TaskCol extends Component {
    state = {taskTitle: "", taskDesc: ""};

    handleChange(event) {

        if (event.target.className === styles.taskTitle) {
            var newTitle = event.target.value.replace(/\n/g, "");
            event.target.value = newTitle;

            const newState = {
                ...this.state,
                taskTitle: newTitle,
            };

            this.setState(newState);
            
            return;
        }

        // don't allow too many new lines
        var newEntry = event.target.value.replace(/\n\n/g, '\n');
        event.target.value = newEntry;

        const newState = {
            ...this.state,
            taskDesc: newEntry,
        };

        this.setState(newState);

    }

    resetHeight(event) {
        event.target.style.height = 1 + "px";
        event.target.style.height = (5 + event.target.scrollHeight) + "px";
        // console.log(event.target.scrollHeight);
    }

    // bind 'this'
    handleChange = this.handleChange.bind(this);
    resetHeight = this.resetHeight.bind(this);

    dropHeight(event) {
        if (event.target.style.height < 300) {
            return true;
        }
        return false;
    }

    render() {

        return (
            <Draggable draggableId={this.props.col.id} index={this.props.index}>
                {(provided) => (
                    <div 
                        className={styles.taskCol}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        {/* <div {...provided.dragHandleProps}>{this.props.col.title}</div> */}
                        <div className={styles.taskHeader}>

                            <textarea
                                placeholder="Click to edit task title"
                                value={this.state.value}
                                onKeyUp={this.resetHeight}
                                onChange={this.handleChange} 
                                className={styles.taskTitle}
                            />
                            <span className={styles.dragHandle} {...provided.dragHandleProps}>
                                <i class="fas fa-grip-lines-vertical"></i>
                            </span>

                        </div>
                        <div className={styles.taskInfo}>
                            <textarea
                                placeholder="description"
                                value={this.state.value}
                                onKeyUp={this.resetHeight}
                                onChange={this.handleChange} 
                                className={styles.taskDesc}
                            />
                            <Button 
                                color="white" 
                                text="Task Duration" 
                                iconL={<i class="fas fa-calendar"></i>} 
                                className={styles.taskDuration}
                            />
                        </div>

                        <Droppable droppableId={this.props.col.id} type="actions">
                            {(provided, snapshot) => (
                                <div 
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={styles.dropArea}
                                >
                                    <div className={snapshot.isDraggingOver ? styles.draggingOver: ''}>
                                        <InnerList tasks={this.props.tasks} />
                                        {provided.placeholder}
                                    </div>
                                    <AddActionBtn />
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default TaskCol;
