import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import React, { Component } from "react";

import TaskCol from "./TaskCol";
import AddBtn from "./sandbox/AddBtn";
import styles from "../modules/tmp.module.scss";





class DnD extends Component {
  state = this.props;

  addTask(event) {
    const currLen = this.state.totalTasks;
    const newTask = {
      id: "task-" + (currLen + 1),
      title: "", 
      actionIds: [], 
    }

    const newList = Object.assign(this.state.tasks, {[newTask.id]: newTask});
    const newOrder = Array.from(this.state.taskOrder);

    newOrder.push(newTask.id);

    const newState = {
      ...this.state,
      tasks: newList,
      taskOrder: newOrder,
      totalTasks: currLen + 1,
    };

    this.state = this.setState(newState);
  }

  addAction(event) {
    if (event.target.className == "fas fa-plus") {
      event.target = event.target.parentNode;
    }

    const currLen = this.state.totalActions;
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
      totalActions: currLen + 1,
      actions: newList,
    }

    console.log(newState.tasks);
    newState.tasks[taskId].actionIds.push(newAction.id);

    this.state = this.setState(newState);

  }

  deleteTask(event) {
    const taskId = event.target.id.replace(/_deleteBtn/g, '');

    const newTaskOrder = Array.from(this.state.taskOrder);
    const newTasks = this.state.tasks;
    const actionList = newTasks[taskId].actionIds;
    const newActions = this.state.actions;
    const taskIndex = newTaskOrder.findIndex(task => (task == taskId));
    
    newTaskOrder.splice(taskIndex, 1);
    console.log(newTasks);

    for (let i = 0; i < actionList.length; i++) {
      delete newActions[actionList[i]];
      
    }

    delete newTasks[taskId];
    
    const newState = {
      ...this.state,
      actions: newActions,
      tasks: newTasks,
      taskOrder: newTaskOrder,
    }

    this.setState(newState);
  }

  deleteAction(e) {
    const actionId = e.target.id.replace(/_deleteBtn/g, '');
    // i stg there's a much better implementation for this
    const taskId = document.getElementById(actionId).parentNode.parentNode.parentNode.id;
    
    const newActionIds = Array.from(this.state.tasks[taskId].actionIds);
    const newActions = this.state.actions;
    const actionIndex = newActionIds.findIndex(action => (action == actionId));
    
    newActionIds.splice(actionIndex, 1); 
    delete newActions[actionId];

    const newTask = {
      ...this.state.tasks[taskId],
      actionIds: newActionIds,
    };

    const newState = {
      ...this.state,
      tasks: {
        ...this.state.tasks,
        [newTask.id]: newTask
      }
    }

    this.setState(newState);
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
  deleteTask = this.deleteTask.bind(this);
  deleteAction = this.deleteAction.bind(this);

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
                  const actions = task.actionIds.map(actionId => this.state.actions[actionId]);
                  
                  return (
                    <TaskCol 
                      key={task.id} 
                      task={task} 
                      actions={actions} 
                      index={index}
                      addAction={this.addAction}
                      deleteAction={this.deleteAction}
                      deleteTask={this.deleteTask}
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

class InnerList extends Component {
  render() {
    const { task, actionMap, index } = this.props;
    const actions = task.actionIds.map(actionId => actionMap[actionId]);
    
    return <TaskCol 
              task={task} 
              actions={actions} 
              index={index} 
              addAction={this.props.addAction} 
              deleteAction={this.props.deleteAction} 
              deleteTask={this.props.deleteTask} 
            />;
  }
}