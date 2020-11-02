import React from 'react';
import { connect } from 'react-redux';
import styles from '../../modules/signUp.module.scss';
import Button from '../../shared/sandbox/Button';
import { finishUserSignUp, storage } from '../../shared/firebase/firebase';
import { getFirebase } from '../../shared/firebase/config';
import { useHistory } from 'react-router-dom';
import { updateInfoFromSignUp } from '../../actions/userAction';

const finishSetup = async (
	firstStep,
	secondStep,
	thirdStep,
	history,
	updateInfoFromSignUp
) => {
	const uid = getFirebase().auth().currentUser.uid;
	const photoRef = storage.ref(`users/${uid}/photo`);
	var photoURL;
	if (firstStep.imgSrc === 'default') {
		photoURL = firstStep.img;
	}
	if (firstStep.imgSrc !== 'default') {
		await photoRef.put(firstStep.imgSrc);
		photoURL = await photoRef.getDownloadURL();
	}
	updateInfoFromSignUp(photoURL, firstStep, secondStep, thirdStep);

	await finishUserSignUp({
		uid: uid,
		photoURL,
		firstStep,
		secondStep,
		thirdStep,
	});
	history.push('/profile', { fromSignUp: true });
};

const StepFour = (props) => {
	const history = useHistory();
	return (
		<div className={styles.step_four}>
			<h2>
				Almost there, let's confirm
				<br />
				your account details.
			</h2>
			<div className={styles.step_four_content}>
				<div className={styles.img_div}>
					<img
						src={props.stepOne.img}
						className={styles.img_preview}
						alt="profile"
					/>
				</div>
				<div className={styles.name_div}>
					{props.stepOne.firstName} {props.stepOne.lastName}
				</div>
				<div className={styles.details_div}>
					<i
						className="fas fa-map-marker-alt"
						style={{ marginRight: '15px' }}
					/>{' '}
					{props.stepTwo.location}
					<br />
					<i
						className="fas fa-suitcase"
						style={{ marginRight: '15px' }}
					/>
					{props.stepTwo.occupation}
				</div>
				<div className={styles.desc_div}>
					{props.stepTwo.personalDesc}
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
					className="blue"
					onClick={() => {
						finishSetup(
							props.stepOne,
							props.stepTwo,
							props.stepThree,
							history,
							props.updateInfoFromSignUp
						);
					}}
					text="Finish Sign Up!"
				/>
			</div>
		</div>
	);
};

export default connect(null, { updateInfoFromSignUp })(StepFour);
