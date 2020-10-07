import React from 'react';
import Checkbox from './Checkbox';
import Button from '../../shared/sandbox/Button';
import styles from '../../modules/signUp.module.scss';

const StepTwo = (props) => {
	const setChecked = (id, setId) => {
		if (props.data[id] === true) {
			setId({
				...props.data,
				[id]: false,
			});
		} else {
			setId({
				...props.data,
				[id]: true,
			});
		}
	};
	return (
		<div className={styles.step}>
			<h6>Expertise:</h6>
			<div className={styles.row}>
				<div className={styles.column}>
					<Checkbox
						id="id1"
						checked={props.data.id1}
						setCheck={props.setStepTwo}
						onChange={setChecked}
						label="Business & Management"
					/>
					<Checkbox
						id="id2"
						type="checkbox"
						checked={props.data.id2}
						setCheck={props.setStepTwo}
						onChange={setChecked}
						label="Creative Arts"
					/>
					<Checkbox
						id="id3"
						type="checkbox"
						checked={props.data.id3}
						setCheck={props.setStepTwo}
						onChange={setChecked}
						label="Engineering & Mathematics"
					/>
					<Checkbox
						id="id4"
						type="checkbox"
						checked={props.data.id4}
						setCheck={props.setStepTwo}
						onChange={setChecked}
						label="Humanities, Arts & Social Sciences"
					/>
					<Checkbox
						id="id5"
						type="checkbox"
						checked={props.data.id5}
						setCheck={props.setStepTwo}
						onChange={setChecked}
						label="IT & Computer Science"
					/>
				</div>
				<div className={styles.column}>
					<Checkbox
						id="id6"
						type="checkbox"
						checked={props.data.id6}
						setCheck={props.setStepTwo}
						onChange={setChecked}
						label="Law, Legal Studies & Justice"
					/>
					<Checkbox
						id="id7"
						type="checkbox"
						checked={props.data.id7}
						setCheck={props.setStepTwo}
						onChange={setChecked}
						label="Medical & Health Sciences"
					/>
					<Checkbox
						id="id8"
						type="checkbox"
						checked={props.data.id8}
						setCheck={props.setStepTwo}
						onChange={setChecked}
						label="Property & Built Environment"
					/>
					<Checkbox
						id="id9"
						type="checkbox"
						checked={props.data.id9}
						setCheck={props.setStepTwo}
						onChange={setChecked}
						label="Sciences"
					/>
					<Checkbox
						id="id10"
						type="checkbox"
						checked={props.data.id10}
						setCheck={props.setStepTwo}
						onChange={setChecked}
						label="Teaching & Education"
					/>
				</div>
			</div>
			<div className={styles.background_info}>
				<h6>Background Information:</h6>
				<input
					className="inp-text"
					value={props.data.city}
					onChange={(e) => {
						props.setStepTwo({
							...props.data,
							city: e.target.value,
						});
					}}
					placeholder="City"
					required
				/>
				<input
					className="inp-text"
					placeholder="Country"
					value={props.data.country}
					onChange={(e) => {
						props.setStepTwo({
							...props.data,
							country: e.target.value,
						});
					}}
					required
				/>
				<textarea
					className={`inp-text ${styles.textarea}`}
					value={props.data.personalDesc}
					onChange={(e) => {
						props.setStepTwo({
							...props.data,
							personalDesc: e.target.value,
						});
					}}
					placeholder="Personal Description (Optional)"
				/>
			</div>
			<div className={styles.btn_controls}>
				<Button
					iconL={<i className="fas fa-arrow-left" />}
					text="Back"
					onClick={() => {
						props.prevStep();
					}}
				/>
				<Button
					colour="blue"
					iconR={<i className="fas fa-arrow-right" />}
					text="Next"
					onClick={() => {
						props.nextStep();
					}}
				/>
			</div>
		</div>
	);
};

export default StepTwo;
