import React from "react";
import { Draggable } from "react-beautiful-dnd";

import Options from "./sampleOptions";
import Dropdown from "./sandbox/Dropdown";
import styles from "../modules/tmp.module.scss";


class ActionCard extends React.Component {

  handleClick(event) {
    const task = document.getElementById(event.target.id.replace(/_editBtn/g,'') + '_edit');
    const type = event.target.className;

    if (type == "fas fa-edit") {
      task.style.display = "block";
      event.target.className = "fas fa-save";

      return;

    } else if (type == "fas fa-save") {
      task.style.display = "none";
      event.target.className = "fas fa-edit";

      return;
    }
  }


  render() {
    return (
      <Draggable 
        draggableId={this.props.action.id} 
        index={this.props.index}
      >
        {(provided) => (
          <div 
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={styles.actionsCard}
          >
            <span className={styles.actionsContent}>
              <div className={styles.actions}>

              </div>

              <div className={styles.editAction} id={`${this.props.action.id}_edit`}>
                <div className={styles.tools} >
                  Used (tools)
                  <Dropdown 
                    options={Options} 
                    isMulti={true} 
                    isCreatable={true} 
                    keyColour="#AFDEE9"
                  />
                </div>
                <br />
                <div className={styles.tools} >
                  For (skills)
                  <Dropdown 
                    options={Options} 
                    isMulti={true} 
                    isCreatable={true}
                  />
                </div>
                <br />
                <div className={styles.actionDesc} >
                  Description (Optional)
                  <input className="inp-text"
                    placeHolder="type..."
                  ></input>
                </div>
              </div>
            </span>
            <div className={styles.btnCol}>
              <span {...provided.dragHandleProps} className={styles.dragHandle}>
                <i class="fas fa-grip-lines"></i>
              </span>
              <span className={styles.editBtn}>
                <i 
                  class="fas fa-edit" 
                  id={`${this.props.action.id}_editBtn`} 
                  onClick={this.handleClick}
                ></i>
              </span>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default ActionCard;
