import React, { useState } from 'react';
import { connect } from 'react-redux';
import Timeline from '../../shared/sandbox/Timeline';
import Button from '../../shared/sandbox/Button';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import StepFour from './stepFour';
import Typing from '../../images/typing.png';
import styles from '../../modules/signUp.module.scss';
const mapStateToProps = (state) => {
	return { user: state.user };
};

const SignUp = () => {
	const [step, setStep] = useState(0);
	const [percent, setPercent] = useState(0);

	function nextStep() {
		if (step < 3) {
			setPercent((step * 100 + 100) / 3);
			setStep(step + 1);
		}
	}
	function prevStep() {
		if (step > 0) {
			setPercent((step * 100 - 100) / 3);
			setStep(step - 1);
		}
	}
	return (
		<div className={styles.sign_up_container}>
			<div className={styles.sign_up_side_panel}>
				<h1>Create account</h1>
				<p>Sign up to create your e-portfolio</p>
				<img className={styles.typing_img} src={Typing} alt="typing" />
			</div>
			<div className={styles.sign_up_process}>
				<section className={styles.sign_up_form}>
					<div className={styles.timeline}>
						<Timeline label={label} percent={percent} />
					</div>
					{step === 0 ? (
						<StepOne />
					) : step === 1 ? (
						<StepTwo />
					) : step === 2 ? (
						<StepThree />
					) : step === 3 ? (
						<StepFour />
					) : (
						''
					)}
					<div className={styles.btn_controls}>
						{step === 0 ? (
							<p> </p>
						) : (
							<Button
								iconL={<i className="fas fa-arrow-left" />}
								text="Back"
								onClick={prevStep}
							/>
						)}
						{step === 2 ? <a>Skip</a> : ''}
						<Button
							colour="blue"
							iconR={<i className="fas fa-arrow-right" />}
							text="Next"
							onClick={nextStep}
						/>
					</div>
				</section>
			</div>
		</div>
	);
};

export default connect(mapStateToProps)(SignUp);

const label = [
	'ACCOUNT SETUP',
	'BACKGROUND INFORMATION',
	'SOCIAL ACCOUNTS',
	'CONFIRMATION',
];
