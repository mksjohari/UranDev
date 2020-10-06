import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import React, { Component, PureComponent } from "react";
import TaskCol from "./TaskCol";
import Data from "./sampleData";

import styles from "../modules/tmp.module.scss";


// saves computational time
class InnerList extends PureComponent {
    render() {
        const { col, taskMap, index } = this.props;
        const tasks = col.taskIds.map(taskId => taskMap[taskId]);

        return <TaskCol col={col} tasks={tasks} index={index}/>;
    }
}


class DnD extends Component {
    state = Data;

    onDragEnd = result => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;            
        }

        if (type === "column") {
            const newColOrder = Array.from(this.state.colOrder);
            newColOrder.splice(source.index, 1);
            newColOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...this.state,
                colOrder: newColOrder,
            };

            this.setState(newState);

            return;
        }

        const start = this.state.cols[source.droppableId];
        const end = this.state.cols[destination.droppableId];
        
        if (start === end) {
            const newTaskIds = Array.from(start.taskIds);

            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newCol = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...this.state,
                cols: {
                    ...this.state.cols,
                    [newCol.id]: newCol,
                }
            }

            this.setState(newState);
            return;
        }

        // moving between tasks
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const endTaskIds = Array.from(end.taskIds);
        endTaskIds.splice(destination.index, 0, draggableId);
        const newEnd = {
            ...end,
            taskIds: endTaskIds,
        };

        const newState = {
            ...this.state,
            cols: {
                ...this.state.cols,
                [newStart.id]: newStart,
                [newEnd.id]: newEnd,
            },
        };

        this.setState(newState);
        
    }

    render() {
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <Droppable 
                    droppableId="TaskArea" 
                    direction="horizontal"
                    type="column"
                >
                    {(provided) => (
                        <div 
                            className={styles.container}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        > 
                            {this.state.colOrder.map((colId, index) => {
                                const col = this.state.cols[colId];
                                
                                return (
                                    <InnerList 
                                        key={col.id} 
                                        col={col} 
                                        taskMap={this.state.tasks} 
                                        index={index} 
                                    />) 
                                })
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        
        )
    }
    
}
export default DnD;
