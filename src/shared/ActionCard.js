import React from "react";
import { Draggable } from "react-beautiful-dnd";

import Options from "./sampleOptions";
import Dropdown from "./sandbox/Dropdown";
import ActionContent from "./ActionContent";
import styles from "../modules/tmp.module.scss";


class ActionCard extends React.Component {

  handleClick(event) {
    const edit = document.getElementById(event.target.id.replace(/_editBtn/g,'') + '_edit');
    const task = document.getElementById(event.target.id.replace(/_editBtn/g,'') + '_content');
    const type = event.target.className;

    if (type == "fas fa-edit") {
      task.style.display = "none";
      edit.style.display = "block";
      event.target.className = "fas fa-save";

      return;

    } else if (type == "fas fa-save") {
      edit.style.display = "none";
      task.style.display = "block";
      event.target.className = "fas fa-edit";

      return;
    }
  }

  handleClick = this.handleClick.bind(this);

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
            <span className={styles.actions}>
              <div className={styles.actionContent} id={`${this.props.action.id}_content`} >
                <ActionContent 
                  tools={this.props.action.tools} 
                  skills={this.props.action.skills}
                  description={this.props.action.description}
                />
              </div>

              <div className={styles.editAction} id={`${this.props.action.id}_edit`}>
                <div className={styles.toolsEdit} >
                  Used (tools)
                  <Dropdown 
                    options={Options} 
                    isMulti={true} 
                    isCreatable={true} 
                    defaultValue={this.props.action.tools.map(
                      (tool) => (
                        { value: tool, label: tool }
                      )) }
                    keyColour="#AFDEE9"
                  />
                </div>
                <br />
                <div className={styles.skillsEdit} >
                  For (skills)
                  <Dropdown 
                    options={Options} 
                    isMulti={true} 
                    isCreatable={true}
                    defaultValue={this.props.action.skills.map(
                      (skill) => (
                        { value: skill, label: skill }
                      )) }
                  />
                </div>
                <br />
                <div className={styles.actionDesc} >
                  Description (Optional)
                  <textarea className="descArea"
                    placeHolder={this.props.action.description.length ? "" : "Type..."}
                    value={this.props.action.description.length ? this.props.action.description : ""}
                  ></textarea>
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
