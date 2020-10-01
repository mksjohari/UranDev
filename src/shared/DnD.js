import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { Component, useState } from "react";
import ReactDOM from "react-router-dom";
import TaskCol from "./TaskCol";
import Data from "./sampleData";

import styles from "./modules/tmp.module.scss";
import Logo from "../images/logo.png";


class DnD extends React.Component {
    state = Data;

    render() {
        return this.state.colOrder.map(colId => {
            const col = this.state.cols[colId];
            const tasks = col.taskIds.map(taskId => this.state.tasks[taskId]);

            return <TaskCol key={col.id} col={col} tasks={tasks} />;
        });
    }
    
}
export default DnD;
