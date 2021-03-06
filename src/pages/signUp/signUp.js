import React, { useState, useEffect } from 'react';
import Timeline from '../../shared/sandbox/Timeline';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import StepFour from './stepFour';
import Typing from '../../images/typing.png';
import styles from '../../modules/signUp.module.scss';
import { useHistory } from 'react-router-dom';

const SignUp = (props) => {
	const [step, setStep] = useState(0);
	const [percent, setPercent] = useState(0);
	const [stepOne, setStepOne] = useState(stepOneDefault);
	const [stepTwo, setStepTwo] = useState(stepTwoDefault);
	const [stepThree, setStepThree] = useState(stepThreeDefault);
	const state = props.location.state;
	const history = useHistory();
	useEffect(() => {
		if (state) {
			setStepOne({
				...stepOneDefault,
				firstName: state.firstName,
				lastName: state.lastName,
			});
		} else {
			history.push('/');
		}
	}, [state, history]);
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
							nextStep={nextStep}
							setStepOne={setStepOne}
							stepOne={stepOne}
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
							data={stepThree}
							prevStep={prevStep}
						/>
					) : step === 3 ? (
						<StepFour
							stepOne={stepOne}
							stepTwo={stepTwo}
							stepThree={stepThree}
							prevStep={prevStep}
						/>
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

const stepOneDefault = {
	role: 'Jobseeker',
	firstName: '',
	lastName: '',
	imgSrc: 'default',
	img:
		'https://firebasestorage.googleapis.com/v0/b/uran-28-12-98.appspot.com/o/static%2Fdefault.jpg?alt=media&token=dac35811-de8e-41c6-9915-ed31a077f641',
};

const stepTwoDefault = {
	expertise: {
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
	},

	occupation: '',
	location: '',
	description: '',
};
const stepThreeDefault = {
	linkedIn: 'https://www.linkedin.com/in/',
	github: 'https://www.github.com/',
	slack: 'https://www.slack.com/',
	codeSandBox: 'https://codesandbox.io/u/',
	behance: 'https://www.behance.net/',
	figma: 'https://figma.com/',
	dribble: 'https://dribbble.com/',
};
