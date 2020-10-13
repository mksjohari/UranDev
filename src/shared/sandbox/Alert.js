import React from 'react';
import styles from '../../modules/alert.module.scss'

class Alert extends React.Component {

  render() {
    return (
      <>
        <div className={styles.title}>
          <i className={styles.alert + ' fas fa-exclamation-triangle'}></i>
          <h3> 
            Are you sure you want to delete this {this.props.type}? 
          </h3>
        </div>
        <p className={styles.msg}>
          This action can not be undone.
        </p>
      </>
    )
  }
}

export default Alert;
