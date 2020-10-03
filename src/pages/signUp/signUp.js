import React, { useState } from 'react';
import Timeline from '../../shared/sandbox/Timeline';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import StepFour from './stepFour';
import Typing from '../../images/typing.png';
import styles from '../../modules/signUp.module.scss';

const SignUp = (props) => {
	const [step, setStep] = useState(0);
	const [percent, setPercent] = useState(0);
	const [stepOne, setStepOne] = useState({});
	const [stepTwo, setStepTwo] = useState(stepTwoDefault);
	const [stepThree, setStepThree] = useState(stepThreeDefault);
	console.log(stepThree);
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
						<StepOne
							fromSignUp={true}
							nextStep={nextStep}
							setStepOne={setStepOne}
							stepOne={stepOne}
							info={{ firstName: 'Khairi', lastName: 'Johari' }}
						/>
					) : step === 1 ? (
						<StepTwo
							nextStep={nextStep}
							setStepTwo={setStepTwo}
							data={stepTwo}
							prevStep={prevStep}
						/>
					) : step === 2 ? (
						<StepThree
							nextStep={nextStep}
							setStepThree={setStepThree}
							stepThree={stepThree}
							prevStep={prevStep}
						/>
					) : step === 3 ? (
						<StepFour />
					) : (
						''
					)}
				</section>
			</div>
		</div>
	);
};

export default SignUp;

const label = [
	'ACCOUNT SETUP',
	'BACKGROUND INFORMATION',
	'SOCIAL ACCOUNTS',
	'CONFIRMATION',
];

const stepTwoDefault = {
	id1: false,
	id2: false,
	id3: false,
	id4: false,
	id5: false,
	id6: false,
	id7: false,
	id8: false,
	id9: false,
	id10: false,
	city: '',
	country: '',
	personalDesc: '',
};
const stepThreeDefault = {
	linkedIn: '',
	github: '',
	slack: '',
	codeSandBox: '',
	behance: '',
	figma: '',
	dribble: '',
};
