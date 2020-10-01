import React, { useState } from 'react';
import SegmentedTab from '../../shared/sandbox/SegmentedTab';
import styles from '../../modules/signUp.module.scss';
import firebase from 'firebase';
import 'firebase/storage';
import buttonStyle from '../../modules/_button.module.scss';
import { storage, getBasicUser } from '../../shared/firebase/firebase';
import { getFirebase } from '../../shared/firebase/config';

const getUserInfo = async () => {
	const uid = getFirebase().auth().currentUser.uid;
	const userInfo = await getBasicUser(uid);
	return userInfo;
};

const StepOne = (props) => {
	console.log('yes', props);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [img, setImg] = useState('');
	if (props.fromSignUp == true) {
		setFirstName(props.info.firstName);
		setFirstName(props.info.lastName);
	} else {
		const result = getUserInfo();
		setFirstName(result[0].firstName);
		setFirstName(result[0].lastName);
		console.log('yea');
	}

	function handleChange(event) {
		storage
			.ref(`user/ha`)
			.put(event.target.files[0])
			.then(
				storage
					.ref('user/ha')
					.getDownloadURL()
					.then((url) => setImg(url))
			);
		setImg(URL.createObjectURL(event.target.files[0]));
	}

	return (
		<div className={styles.step}>
			<h6>Personal Details:</h6>
			<div className={styles.personal_details}>
				<SegmentedTab />
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
		</div>
	);
};

export default StepOne;
