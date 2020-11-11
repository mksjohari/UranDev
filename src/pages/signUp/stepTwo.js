import React from 'react';
import Checkbox from '../../shared/sandbox/Checkbox';
import Button from '../../shared/sandbox/Button';
import styles from '../../modules/signUp.module.scss';
import LocationDropdown from './LocationDropdown';

const StepTwo = (props) => {
	const setChecked = (id, setId) => {
		if (props.data.expertise[id] === true) {
			setId({
				...props.data,
				expertise: {
					...props.data.expertise,

					[id]: false,
				},
			});
		} else {
			setId({
				...props.data,
				expertise: {
					...props.data.expertise,

					[id]: true,
				},
			});
		}
	};
	return (
		<div className={styles.step_two}>
			<div className={styles.step_two_div}>
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
						value={props.data.occupation}
						onChange={(e) => {
							props.setStepTwo({
								...props.data,
								occupation: e.target.value,
							});
						}}
						placeholder="Occupation"
						required
					/>
					<LocationDropdown
						setStepTwo={props.setStepTwo}
						data={props.data}
					/>
					<spanarea
						className={`inp-text-area ${styles.textarea}`}
						value={props.data.personalDesc}
						maxLength="1000"
						onChange={(e) => {
							props.setStepTwo({
								...props.data,
								personalDesc: e.target.value,
							});
						}}
						placeholder="Personal Description (Optional) - 1000 Characters Maximum"
					/>
				</div>
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
