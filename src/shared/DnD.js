import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import React, { Component, PureComponent } from "react";

import TaskCol from "./TaskCol";
import AddBtn from "./sandbox/AddBtn";
import styles from "../modules/tmp.module.scss";


class InnerList extends Component {
  render() {
    const { task, actionMap, index } = this.props;
    const actions = task.actionIds.map(actionId => actionMap[actionId]);
    
    return <TaskCol task={task} actions={actions} index={index} addAction={this.props.addAction} />;
  }
}


class DnD extends Component {
  state = this.props;
  actionsize = Object.keys(this.state.actions).length;

  addTask(event) {
    const currLen = Object.keys(this.state.tasks).length;
    const newTask = {
      id: "task-" + (currLen + 1),
      title: "", 
      actionIds: [], 
    }

    const newList = Object.assign(this.state.tasks, {[newTask.id]: newTask});

    const newState = {
      ...this.state,
      tasks: newList,
    };

    newState.taskOrder.push(newTask.id);

    this.state = this.setState(newState);
  }

  addAction(event) {
    const currLen = Object.keys(this.state.actions).length;
    const taskId = event.target.id.replace(/_add/g, '');

    const newAction = {
      id: "action-" + (currLen + 1),
      description: "", 
      skills: [], 
      tools: [],
    }

    const newList = Object.assign(this.state.actions, {[newAction.id]: newAction});

    console.log(newAction);
    const newState = {
      ...this.state,
      actions: newList,
    }

    newState.tasks[taskId].actionIds.push(newAction.id);

    console.log(this.state.actions);
    this.state = this.setState(newState);

    // test test

  }

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

    // moving between tasks
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

  addTask = this.addTask.bind(this);
  addAction = this.addAction.bind(this);

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
                      addAction={this.addAction} 
                    />) 
                  })
                }
                {provided.placeholder}
                <AddBtn className={styles.addTaskBtn} onClick={this.addTask}/>
              </div>
              
          )}
        </Droppable>
      </DragDropContext>
    
    )
  }
  
}
export default DnD;
