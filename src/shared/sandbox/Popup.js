import React from 'react';

import styles from '../../modules/popup.module.scss';
import Button from './Button';

class Popup extends React.Component {
	state = this.props;

	render() {
		return (
			<>
				<Button
					className={this.props.className}
					id={this.props.BtnId}
					colour={this.props.BtnColour}
					iconL={this.props.BtnIconL}
					iconR={this.props.BtnIconR}
					iconB={this.props.BtnIconB}
					text={this.props.BtnText}
					onClick={lockBg}
				/>
				<div
					className={styles.popupContainer}
					id={this.props.BtnId + '_popContent'}
				>
					<div
						className={styles.contentContainer}
						style={{
							width: this.props.width + 'px',
							backgroundColor: this.props.contentBGColour,
						}}
					>
						{this.props.content}

						<div className={styles.btnsRow}>
							{this.props.hasConfirm ? (
								<Button
									text={this.props.confirmBtnLabel}
									id={this.props.BtnId + '_confirm'}
									colour={
										this.props.confirmColour
											? this.props.confirmColour
											: 'reddo'
									}
									iconR={<i className="fas fa-check"></i>}
									className={styles.closeBtn}
									onClick={(e) => {
										this.props.onConfirm();
										close(e, '_confirm');
									}}
								/>
							) : (
								''
							)}
							<Button
								colour={this.props.closeColour}
								id={this.props.BtnId + '_close'}
								text={this.props.closeBtnLabel}
								className={styles.closeBtn}
								iconR={<i className="fas fa-times"></i>}
								onClick={(e) => close(e, '_close')}
							/>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Popup;

export const lockBg = (e) => {
	if (e.target.tagName === 'SPAN' || e.target.tagName === 'I') {
		e.target = e.target.parentNode;
	}
	const body = document.getElementsByTagName('body')[0];
	const overlayId = e.target.id + '_popContent';
	const overlay = document.getElementById(overlayId);
	overlay.style.display = 'flex';
	body.style.height = `${window.innerHeight}px`;
	body.style.overflow = 'hidden';
	body.style.pointerEvents = 'none';

	// document.addEventListener('keydown', (event) => {
	// 	if (event.key === 'Escape') {
	// 		overlay.style.display = 'none';
	// 		body.style.overflow = 'scroll';
	// 		body.style.height = '100%';
	// 	}
	// });
};

export const close = (e, str) => {
	console.log(e);
	var re = new RegExp(str);
	// console.log(e.target, re);

	if (e.target.tagName === 'SPAN' || e.target.tagName === 'I') {
		e.target = e.target.parentNode;
	}

	// console.log(e.target);

	const overlay = document.getElementById(
		e.target.id.replace(re, '_popContent')
	);
	const body = document.getElementsByTagName('body')[0];

	overlay.style.display = 'none';
	body.style.overflow = 'scroll';
	body.style.height = '100%';
	body.style.pointerEvents = 'auto';
};
