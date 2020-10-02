import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import React, { Component, useState } from "react";
import ReactDOM from "react-router-dom";
import TaskCol from "./TaskCol";
import Data from "./sampleData";

import styles from "./modules/tmp.module.scss";
import Logo from "../images/logo.png";


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
                                const tasks = col.taskIds.map(taskId => this.state.tasks[taskId]);

                                return (<TaskCol key={col.id} col={col} tasks={tasks} index={index} />) 
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
