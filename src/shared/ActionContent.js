import React, { Component } from "react";
import styles from "../modules/tmp.module.scss";

class ActionContent extends Component {


  render() {
    return (
      <>
        <div>{this.props.tools[0] ? 'Used tools' : ''}</div>
        <div className={this.props.tools[0] ? styles.tools : ''}>
          {this.props.tools[0] ?
            (this.props.tools.map((tool) => (
              <span className={styles.toolItem}>{tool}</span>
              )
            )) : <></>
          } 
        </div>
        <div>{this.props.skills[0] ? 'Used skills' : ''}</div>
        <div className={this.props.skills[0] ? styles.skills : ''}>
          {this.props.skills[0] ?
            (this.props.skills.map((skill) => (
              <span className={styles.skillItem}>{skill}</span>
              )
            )) : <></>
          } 
        </div>
        <div>{this.props.description.length ? 'Description:' : ''}</div>
        <div className={styles.description}>{this.props.description}</div>
      </>
    );
  }
}

export default ActionContent;
