import React from 'react';
import styles from '../../modules/alert.module.scss'
import Button from './Button';

class Alert extends React.Component {

  render() {
    return (
      <>
        <div 
          className={styles.container + ' ' + this.props.className}
          id={this.props.id + '_alert'}
        >
          <div className={styles.title}>
            <i className={styles.alert + ' fas fa-exclamation-triangle'}></i>
            <h3> 
              Are you sure you want to delete this {this.props.type}? 
            </h3>
          </div>
          <p>
            This action can not be undone.
          </p>
          <div className={styles.btnsRow} >
            <Button 
              text='Yes, delete' 
              id={this.props.id + '_delete'} 
              colour='reddo'
              className={styles.closeBtn}
              onClick={this.props.onConfirm} 
            />
            <Button 
              text='No, go back' 
              id={this.props.id + '_close'} 
              className={styles.closeBtn}
              onClick={this.props.close} 
            />
          </div>

        </div>
      </>
    )
  }
}

export default Alert;
