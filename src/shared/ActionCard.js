import React from "react";
import { Draggable } from "react-beautiful-dnd";

import Options from "./sampleOptions";
import Dropdown from "./sandbox/Dropdown";
import ActionContent from "./ActionContent";
import styles from "../modules/tmp.module.scss";


class ActionCard extends React.Component {

  state = this.props;

  handleChange(event) {

    var newDesc = event.target.value.replace(/\n/g, "");
    event.target.value = newDesc;
    this.state.action.description = newDesc;

    const newState = {
      ...this.state,
      description: newDesc,
    };

    this.setState(newState);
  }

  handleClick(event) {
    const edit = document.getElementById(event.target.id.replace(/_editBtn/g,'_edit'));
    const task = document.getElementById(event.target.id.replace(/_editBtn/g, '_content'));
    const type = event.target.className;

    if (type == "fas fa-edit") {
      task.style.display = "none";
      edit.style.display = "block";
      event.target.className = "fas fa-save";

    } else if (type == "fas fa-save") {
      edit.style.display = "none";
      task.style.display = "block";
      event.target.className = "fas fa-edit";

    }
  }

  handleSelectTool(event) {
    var newArr = [];

    if (event) {
      for (let i = 0; i < event.length; i++) {
      const newItem = event[i].label;
        newArr[i] = newItem;
      }  
    }  

    console.log(newArr);
    this.state.action.tools = newArr;

    const newState = {
      ...this.state,
      tools: newArr,
    };

    this.setState(newState);

  }

  handleSelectSkill(event) {
    var newArr = [];
    
    if (event) {
      for (let i = 0; i < event.length; i++) {
      const newItem = event[i].label;
        newArr[i] = newItem;
      }  
    }  

    console.log(newArr);
    this.state.action.skills = newArr;

    const newState = {
      ...this.state,
      skills: newArr,
    };

    this.setState(newState);

  }

  resetHeight(event) {
    event.target.style.height = 1 + "px";
    event.target.style.height = (5 + event.target.scrollHeight) + "px";
    // console.log(event.target.scrollHeight);
  }

  handleClick = this.handleClick.bind(this);
  handleChange = this.handleChange.bind(this);
  handleSelectTool = this.handleSelectTool.bind(this);
  handleSelectSkill = this.handleSelectSkill.bind(this);

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
                    id={`${this.props.action.id}_tools`}
                    options={Options.tools} 
                    isMulti={true} 
                    isCreatable={true} 
                    defaultValue={this.props.action.tools.map(
                      (tool) => (
                        { value: tool, label: tool }
                      )) }
                    keyColour="#AFDEE9"
                    onChange={this.handleSelectTool}
                  />
                </div>
                <br />
                <div className={styles.skillsEdit} >
                  For (skills)
                  <Dropdown 
                    id={`${this.props.action.id}_skills`}
                    options={Options.skills} 
                    isMulti={true} 
                    isCreatable={true}
                    defaultValue={this.props.action.skills.map(
                      (skill) => (
                        { value: skill, label: skill }
                      )) }
                    onChange={this.handleSelectSkill}
                  />
                </div>
                <br />
                <div className={styles.actionDesc} >
                  Description (Optional)
                  <textarea 
                    id={`${this.props.action.id}_desc`}
                    className={styles.descEdit}
                    placeHolder={this.props.action.description.length ? "" : "Type..."}
                    value={this.props.action.description.length ? this.props.action.description : ""}
                    onChange={this.handleChange}
                    onKeyUp={this.resetHeight}
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
