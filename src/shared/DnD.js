import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import React, { Component, PureComponent } from "react";
import TaskCol from "./TaskCol";
import Data from "./sampleData";

import styles from "../modules/tmp.module.scss";


// saves computational time
class InnerList extends PureComponent {
  render() {
    const { task, actionMap, index } = this.props;
    const actions = task.actionIds.map(actionId => actionMap[actionId]);

    return <TaskCol task={task} actions={actions} index={index}/>;
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
      const newTaskOrder = Array.from(this.state.taskOrder);
      newTaskOrder.splice(source.index, 1);
      newTaskOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        taskOrder: newTaskOrder,
      };

      this.setState(newState);

      return;
    }

    const start = this.state.tasks[source.droppableId];
    const end = this.state.tasks[destination.droppableId];
    
    if (start === end) {
      const newActionIds = Array.from(start.actionIds);

      newActionIds.splice(source.index, 1);
      newActionIds.splice(destination.index, 0, draggableId);

      const newTask = {
        ...start,
        actionIds: newActionIds,
      };

      const newState = {
        ...this.state,
        tasks: {
          ...this.state.tasks,
          [newTask.id]: newTask,
        }
      }

      this.setState(newState);
      return;
    }

    // moving between actions
    const startActionIds = Array.from(start.actionIds);
    startActionIds.splice(source.index, 1);
    const newStart = {
      ...start,
      actionIds: startActionIds,
    };

    const endActionIds = Array.from(end.actionIds);
    endActionIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...end,
      actionIds: endActionIds,
    };

    const newState = {
      ...this.state,
      tasks: {
        ...this.state.tasks,
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
              {this.state.taskOrder.map((taskId, index) => {
                const task = this.state.tasks[taskId];
                
                return (
                  <InnerList 
                    key={task.id} 
                    task={task} 
                    actionMap={this.state.actions} 
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
