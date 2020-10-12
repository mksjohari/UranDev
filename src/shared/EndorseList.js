import React from 'react';
import CheckBox from './Checkbox';
import styles from '../modules/endorseList.module.scss'

class EndorseList extends React.Component {
  render() {
    return (
      <>
        <div 
          className={styles.container + ' ' + this.props.className}
          id={this.props.id}
        >
        <h3>Endorse {this.props.isSkill ? 'Skills' : 'Tools'} </h3>
        <p>
          Check the {this.props.isSkill ? 'skills' : 'tool'}(s) you would wish to endorse, 
          and un-check them if you ish to revoke your endorsement.
        </p>
        <CheckBox/>

        </div>
      </>
    )
  }
}

export default EndorseList;
