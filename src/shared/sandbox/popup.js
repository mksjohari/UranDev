import React from 'react';

import styles from '../../modules/popup.module.scss'
import Button from './Button';

/* 
takes in these props:
  className (for button)
  id (for button, the popup container has id '(buttonId)_popContent')
  colour
  iconL (left icon)
  iconR (right icon)
  iconB (???)
  text (button text)
  content(what should be in the popup)
*/

class Popup extends React.Component {
  state = this.props;

  lockBg(e) {

    if (e.target.tagName == 'SPAN') {
      e.target = e.target.parentNode;
    }

    const body = document.getElementsByTagName('body')[0];
    const overlayId = e.target.id + '_popContent';
    const overlay = document.getElementById(overlayId);

    overlay.style.display = 'block';
    body.style.height = `${window.innerHeight}px`;
    body.style.overflow = 'hidden';
    
    // close on esc
    document.addEventListener('keydown', (event) => {
      if (event.key == 'Escape') {
        overlay.style.display = 'none';
      }
    })
  }

  render() {
    return (
      <>
        <Button 
          className={this.props.className} 
          id={this.props.id}
          colour={this.props.colour}
          iconL={this.props.iconL}
          iconR={this.props.iconR}
          iconB={this.props.iconB}
          text={this.props.text}
          onClick={this.lockBg}
        />
        <div className={styles.popupContainer} id={this.props.id + '_popContent'} >
          {this.props.content}
        </div>
      </>
    )
  }
}

export default Popup;
