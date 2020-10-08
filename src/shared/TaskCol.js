import React, { Component, PureComponent, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import ActionCard from "./ActionCard";
import Button from "./sandbox/Button";
import AddBtn from "./sandbox/AddBtn";
import styles from "../modules/tmp.module.scss";

// selective rendering to save computation timee
class InnerList extends Component {

  render () {
  return (
    this.props.actions.map((action, index) => (
    <ActionCard key={action.id} action={action} index={index}/>
    )) 
  )
  }

}

class TaskCol extends Component {
  state = this.props;

  addAction(event) {
    var taskcols = document.getElementsByClassName(styles.taskCol);
    const currLen = Number(taskcols[0].getAttribute("actionsize"));

    const newAction = {
      id: "action-" + (currLen + 1),
      description: "", 
      skills: [], 
      tools: [],
    }
    console.log(newAction);
    const newState = {
      ...this.state,
      actionsize: currLen + 1,
    }

    newState.actions.push(newAction);
    newState.task.actionIds.push(newAction.id);

    for (let i = 0; i < taskcols.length; i++) {
      taskcols[i].setAttribute('actionSize', currLen + 1);
      
    }
    console.log(newState.actions);
    this.state = this.setState(newState);
  }
  
  handleChange(event) {

    if (event.target.className === styles.taskTitle) {
      var newTitle = event.target.value.replace(/\n/g, "");
      event.target.value = newTitle;

      const newTask = {
        ...this.state.task,
        title: newTitle,
      };

      const newState = {
        ...this.state,
        tasks: {
          ...this.state.tasks,
          [newTask.id]: newTask,
        }
        
      };

      this.setState(newState);
      
      return;
    }

    // don't allow too many new lines
    var newEntry = event.target.value.replace(/\n\n/g, '\n');
    event.target.value = newEntry;

    const newTask = {
      ...this.state.task,
      description: newEntry,
    };

    const newState = {
      ...this.state,
      tasks: {
        ...this.state.tasks,
        [newTask.id]: newTask,
      }
      
    };

    this.setState(newState);

  }

  resetHeight(event) {
    event.target.style.height = 1 + "px";
    event.target.style.height = (5 + event.target.scrollHeight) + "px";
  }

  // bind 'this'
  handleChange = this.handleChange.bind(this);
  addAction = this.addAction.bind(this);

  render() {

    return (
    <Draggable draggableId={this.props.task.id} index={this.props.index}>
      {(provided) => (
        <div 
        className={styles.taskCol}
        id={this.props.task.id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        actionsize={this.props.actionsize}
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

            <Droppable droppableId={this.props.task.id} type="actions">
              {(provided, snapshot) => (
                <div 
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={styles.dropArea}
                >
                  <div className={snapshot.isDraggingOver ? styles.draggingOver: ''}>
                    <InnerList actions={this.props.actions} />
                    {provided.placeholder}
                  </div>
                  <AddBtn id={this.props.task.id + '_add'} className={styles.addActionBtn} onClick={this.addAction}/>
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
