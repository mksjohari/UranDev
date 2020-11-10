import React from 'react';
import Button from '../../shared/sandbox/Button';
import { close } from './Popup';
import styles from '../../modules/popup.module.scss';

function Alert(props) {
	return (
		<div>
			<div
				className={`${styles.contentContainer} ${styles.alert_container}`}
			>
				<div className={styles.title}>
					<i
						className={
							styles.alert + ' fas fa-exclamation-triangle'
						}
					></i>
					<h3>
						{props.heading
							? props.heading
							: `Are you sure you want to delete this ${props.type}?`}
					</h3>
				</div>
				<p className={styles.msg}>
					{props.message
						? props.message
						: `This action can not be undone.`}
				</p>
				<div className={styles.btnsRow}>
					{props.hasConfirm ? (
						<Button
							text={props.confirmBtnLabel}
							id={props.id + '_confirm'}
							colour={
								props.confirmColour
									? props.confirmColour
									: 'reddo'
							}
							iconR={<i className="fas fa-check"></i>}
							className={styles.closeBtn}
							onClick={(e) => {
								props.onConfirm();
								close(e, '_confirm');
							}}
						/>
					) : (
						''
					)}
					<Button
						colour={props.closeColour}
						id={props.id + '_close'}
						text={props.closeBtnLabel}
						className={styles.closeBtn}
						iconR={<i className="fas fa-times"></i>}
						onClick={(e) => close(e, '_close')}
					/>
				</div>
			</div>
		</div>
	);
}

export default Alert;
