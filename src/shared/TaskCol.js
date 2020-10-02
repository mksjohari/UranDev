import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import ActionCard from "./ActionCard";
import styles from "./modules/tmp.module.scss";

// selective rendering to save computation timee
class InnerList extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.tasks === this.props.tasks) {
            return false;
        }
        return true;
    }

    render () {
        return (
            this.props.tasks.map((task, index) => (
                <ActionCard key={task.id} task={task} index={index}/>
            )) 
        )
    }

}

class TaskCol extends React.Component {

    render() {
        return (
            <Draggable draggableId={this.props.col.id} index={this.props.index}>
                {(provided) => (
                    <div 
                        className={styles.taskCol}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <div {...provided.dragHandleProps}>{this.props.col.title}</div>

                        <Droppable droppableId={this.props.col.id} type="actions">
                            {(provided, snapshot) => (
                                <div 
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                    className={snapshot.isDraggingOver ? styles.draggingOver: styles.notDraggingOver}
                                >
                                    <InnerList tasks={this.props.tasks} />
                                    {provided.placeholder}
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
