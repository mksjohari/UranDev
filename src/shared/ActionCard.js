import React from "react";
import { Draggable } from "react-beautiful-dnd";

import Options from "./sampleOptions";
import Dropdown from "./sandbox/Dropdown";
import styles from "../modules/tmp.module.scss";

class ActionCard extends React.Component {
  render() {
    return (
      <Draggable 
        draggableId={this.props.task.id} 
        index={this.props.index}
      >
        {(provided) => (
          <div 
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={styles.actionsCard}
          >
            <span className={styles.actionsContent}>
              <div className={styles.tools} >
                Used
                <Dropdown 
                  options={Options} 
                  isMulti={true} 
                  isCreatable={true} 
                  keyColour="#AFDEE9"
                />
              </div>
            </span>
            <span {...provided.dragHandleProps} className={styles.dragHandle}>
              <i class="fas fa-grip-lines"></i>
            </span>
          </div>
        )}
      </Draggable>
    );
  }
}

export default ActionCard;
