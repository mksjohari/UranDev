import React from 'react';
import styles from '../../modules/signUp.module.scss';
import Button from '../../shared/sandbox/Button';

const StepThree = (props) => {
	const onChange = (value, id) => {
		props.setStepThree({
			...props.data,
			[id]: value,
		});
	};
	return (
		<div className={styles.step}>
			<div className={styles.social_icon_div}>
				<span>Linkedin</span>
				<input
					className="inp-text"
					type="url"
					value={props.data.linkedin}
					onChange={(e) => {
						onChange(e.target.value, 'linkedIn');
					}}
					placeholder="URL to account"
				/>
			</div>
			<div className={styles.social_icon_div}>
				<span>Github</span>
				<input
					className="inp-text"
					type="url"
					value={props.data.github}
					onChange={(e) => {
						onChange(e.target.value, 'github');
					}}
					placeholder="URL to account"
				/>
			</div>
			<div className={styles.social_icon_div}>
				<span>Slack</span>
				<input
					className="inp-text"
					type="url"
					value={props.data.slack}
					onChange={(e) => {
						onChange(e.target.value, 'slack');
					}}
					placeholder="URL to account"
				/>
			</div>
			<div className={styles.social_icon_div}>
				<span>Codesandbox</span>
				<input
					className="inp-text"
					type="url"
					value={props.data.codeSandBox}
					onChange={(e) => {
						onChange(e.target.value, 'codeSandBox');
					}}
					placeholder="URL to account"
				/>
			</div>
			<div className={styles.social_icon_div}>
				<span>Behance</span>
				<input
					className="inp-text"
					type="url"
					value={props.data.behance}
					onChange={(e) => {
						onChange(e.target.value, 'behance');
					}}
					placeholder="URL to account"
				/>
			</div>
			<div className={styles.social_icon_div}>
				<span>Figma</span>
				<input
					className="inp-text"
					type="url"
					value={props.data.figma}
					onChange={(e) => {
						onChange(e.target.value, 'figma');
					}}
					placeholder="URL to account"
				/>
			</div>
			<div className={styles.social_icon_div}>
				<span>Dribbble</span>
				<input
					className="inp-text"
					type="url"
					value={props.data.dribble}
					onChange={(e) => {
						onChange(e.target.value, 'dribble');
					}}
					placeholder="URL to account"
				/>
			</div>
			<div className={styles.btn_controls}>
				<Button
					iconL={<i className="fas fa-arrow-left" />}
					text="Back"
					onClick={() => {
						// props.setStepTwo({});
						props.prevStep();
					}}
				/>
				<Button
					colour="blue"
					iconR={<i className="fas fa-arrow-right" />}
					text="Next"
					onClick={() => {
						// props.setStepTwo({});
						props.nextStep();
					}}
				/>
			</div>
		</div>
	);
};

export default StepThree;
