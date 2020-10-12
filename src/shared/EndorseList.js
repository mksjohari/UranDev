import React from 'react';
import CheckBox from './Checkbox';
import styles from '../modules/endorseList.module.scss'
import Button from './sandbox/Button';

class EndorseList extends React.Component {

  itemList = Object.keys(this.props.data.list);

  setChecked = (id, setId) => {
    const count = this.props.data.list[id];
		if (this.props.data[id] === true) {
			setId({
				...this.props.data,
        [id]: false,
        list: {
          ...this.props.data.list,
          [id]: count - 1,
        }
			});
		} else {
			setId({
				...this.props.data,
        [id]: true,
        list: {
          ...this.props.data.list,
          [id]: count + 1,
        }
			});
		}
	};

  render() {
    return (
      <>
        <div 
          className={styles.container + ' ' + this.props.className}
          id={this.props.id + '_container'}
        >
          <div className={styles.title}>
            <i className={' fas fa-medal'}></i>
            <h3>Select {this.props.isSkill ? 'skill(s)' : 'tool(s)'} to endorse </h3>
          </div>
          <p>
            Un-check them if you wish to revoke your endorsement.
          </p>
          <div className={styles.listContainer}>
            {this.itemList.map(item => {
              console.log(item);
              return (
                <div className={styles.checkContainer}>
                  <CheckBox id={item} label={item} onChange={this.setChecked} setCheck={this.props.setItem} />
                  {this.props.data.list[item]} {this.props.data.list[item] == 1 ? 'endorser' : 'endorsers'}
                </div>
                );
            })}
          </div>
          <Button 
            text='close' 
            id={this.props.id + '_close'} 
            colour={this.props.isSkill ? 'yellow': 'blue' }
            className={styles.closeBtn}
            onClick={this.props.close} 
          />

        </div>
      </>
    )
  }
}

export default EndorseList;
