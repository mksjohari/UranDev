import React, { useState } from 'react';
import { connect } from 'react-redux';
import Timeline from '../../shared/Timeline';
import Button from '../../shared/Button';
import StepOne from '../signUp/stepOne';
import StepTwo from '../signUp/stepTwo';
import StepThree from '../signUp/stepThree';
import StepFour from '../signUp/stepFour';
import Typing from '../../images/typing.png';

const mapStateToProps = (state) => {
	return { user: state.user };
};

const Home = (props) => {
	console.log(props.user);
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
		<div className="sign-up-container">
			<div className="sign-up-side-panel">
				<h1>Create account</h1>
				<p>Sign up to create your e-portfolio</p>
				<img className="typing-img" src={Typing} alt="typing" />
				<section className="sign-up-form">
					<div className="timeline">
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
					<div className="btn-controls">
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

export default connect(mapStateToProps)(Home);

const label = [
	'ACCOUNT SETUP',
	'BACKGROUND INFORMATION',
	'SOCIAL ACCOUNTS',
	'CONFIRMATION',
];
