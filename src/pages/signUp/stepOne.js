import React, { useState, useEffect } from 'react';
import SegmentedTab from './SegmentedTab';
import styles from '../../modules/signUp.module.scss';
import Button from '../../shared/sandbox/Button';
import buttonStyle from '../../modules/_button.module.scss';
import { storage, getBasicUser } from '../../shared/firebase/firebase';
import { getFirebase } from '../../shared/firebase/config';

const getUserInfo = async () => {
	const uid = getFirebase().auth().currentUser.uid;
	const userInfo = await getBasicUser(uid);
	return userInfo;
};

const StepOne = (props) => {
	const [role, setRole] = useState('Jobseeker');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [imgSrc, setImgSrc] = useState('');
	const [img, setImg] = useState('');
	useEffect(() => {
		if (Object.keys(props.stepOne).length !== 0) {
			setRole(props.stepOne.role);
			setFirstName(props.stepOne.firstName);
			setLastName(props.stepOne.lastName);
			setImgSrc(props.stepOne.imgSrc);
			setImg(props.stepOne.img);
		} else {
			if (props.fromSignUp === true) {
				setFirstName(props.info.firstName);
				setLastName(props.info.lastName);
			} else {
				const result = getUserInfo();
				setFirstName(result[0].firstName);
				setFirstName(result[0].lastName);
			}
		}
	}, []);

	function handleChange(event) {
		setImgSrc(event.target.files[0]);
		setImg(URL.createObjectURL(event.target.files[0]));
	}

	return (
		<div className={styles.step}>
			<h6>Personal Details:</h6>
			<div className={styles.personal_details}>
				<SegmentedTab role={role} setRole={setRole} />
				<input
					className={`inp-text ${styles.step_one}`}
					placeholder="First name"
					onChange={(e) => setFirstName(e.target.value)}
					value={firstName}
					required
				/>
				<input
					className={`inp-text ${styles.step_one}`}
					placeholder="Last name"
					onChange={(e) => setLastName(e.target.value)}
					value={lastName}
					required
				/>
			</div>
			<h6>Profile Picture:</h6>

			<div className={styles.preview_container}>
				{img ? (
					<img
						className={styles.img_preview}
						src={img}
						alt="Profile pic"
					/>
				) : (
					<div>
						<img
							className={styles.img_preview}
							src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Leon_Sterling.jpg"
							alt="Profile pic"
						/>
						<div id="img-placeholder">
							<i className={`${styles.fas} ${styles.fa_image}`} />
						</div>
					</div>
				)}
				<div className={styles.preview_controls}>
					<label
						className={`${buttonStyle.upload_btn} ${buttonStyle.button}`}
					>
						<input type="file" onChange={handleChange} />
						<i
							className="fas fa-camera"
							style={{ marginRight: 5 }}
						/>
						Upload Photo
					</label>
					<p className={styles.tip}>
						At least 256px x 256px PNG or JPG file
					</p>
				</div>
			</div>
			<div className={styles.btn_controls}>
				{/* {step === 0 ? (
                            <p> </p>
                        ) : (
                            <Button
                                iconL={<i className="fas fa-arrow-left" />}
                                text="Back"
                                onClick={prevStep}
                            />
                        )} */}
				{/* {step === 2 ? <a>Skip</a> : ""}
                        <Button
                            colour="blue"
                            iconR={<i className="fas fa-arrow-right" />}
                            text="Next"
                            onClick={nextStep}
                        /> */}
				<Button
					colour="blue"
					iconR={<i className="fas fa-arrow-right" />}
					text="Next"
					onClick={() => {
						props.setStepOne({
							role,
							firstName,
							lastName,
							imgSrc,
							img,
						});
						props.nextStep();
					}}
				/>
			</div>
		</div>
	);
};

export default StepOne;
