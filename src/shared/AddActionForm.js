import React from 'react';

import Dropdown from './sandbox/Dropdown';
import Options from './sampleOptions';
import Button from './sandbox/Button';
import Droparea from './sandbox/Droparea';

import styles from '../modules/addActionForm.module.scss';

class AddActionForm extends React.Component {
  state = {};

  handleChange(event) {

    var newDesc = event.target.value.replace(/\n/g, "");
    event.target.value = newDesc;
    
    const newState = {
      ...this.state,
      action: {
        ...this.state.action,
        description: newDesc,
      }
    };

    this.setState(newState);
  }

  resetHeight(event) {
    event.target.style.height = 1 + "px";
    event.target.style.height = (5 + event.target.scrollHeight) + "px";
    // console.log(event.target.scrollHeight);
  }

  handleChange = this.handleChange.bind(this);

  render() {
    return (
      <>
        <div className={styles.container}>
          <h3>Add Action</h3>
          <div className={styles.toolsEdit} >
            <div className={styles.title} >What tool(s) did you use?</div>
            <Dropdown 
              id={this.props.actionid + '_tools'}
              options={Options.tools} 
              isMulti={true} 
              isCreatable={true} 
              colour="white"
              // defaultValue={this.state.action.tools.map(
              //   (tool) => (
              //     { value: tool, label: tool }
              //   )) }
              keyColour="#AFDEE9"
              onChange={this.handleSelectTool}
            />
          </div>
          <br />
          <div className={styles.skillsEdit} >
            <div className={styles.title} >What Skill(s) allowed you to achieve this?</div>
            <Dropdown 
              id={this.props.actionid + '_skills'}
              options={Options.skills} 
              isMulti={true} 
              isCreatable={true}
              colour="white"
              // defaultValue={this.state.action.skills.map(
              //   (skill) => (
              //     { value: skill, label: skill }
              //   )) }
              onChange={this.handleSelectSkill}
            />
          </div>
          <br />
          <div className={styles.actionDesc} >
            <div className={styles.title} >Describe your action in detail. (Optional)</div>
            <textarea 
              id={this.props.actionid + '_desc'}
              className={styles.descEdit}
              placeholder='Type...'
              onChange={this.handleChange}
              onKeyUp={this.resetHeight}
            ></textarea>
          </div>
          <br/>
          <div className={styles.actionFiles} >
            <div className={styles.title} >Add files to showcase your work in progress. (Optional, max 10 files)</div>
            <Droparea className={styles.actionFiles} />
          </div>

          <div className={styles.btnRow} >
            <Button
              colour='pink'
              id={this.props.id + '_add'}
              text="Confirm"
              iconR={<i className="fas fa-check" ></i>}
              onClick={this.props.addAction}
            />
            <Button
              colour='reddo'
              id={this.props.id + '_close'}
              text="Cancel"
              iconR={<i className="fas fa-times" ></i>}
              onClick={this.props.close}
            />
          </div>

        </div>
      </>
    )
  }
}

export default AddActionForm;
