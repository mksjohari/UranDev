import React, { useState } from 'react';
import SegmentedTab from '../../shared/sandbox/SegmentedTab';
import styles from '../../modules/signUp.module.scss';
import buttonStyle from '../../modules/_button.module.scss';

const StepOne = () => {
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [img, setImg] = useState('');
	function handleChange(event) {
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
					onChange={(e) => setFname(e.target.value)}
					required
				/>
				<input
					className={`inp-text ${styles.step_one}`}
					placeholder="Last name"
					onChange={(e) => setLname(e.target.value)}
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
					<div id="img-placeholder">
						<i className={`${styles.fas} ${styles.fa_image}`} />
					</div>
				)}
				<div className={styles.preview_controls}>
					<label
						className={(buttonStyle.upload_btn, buttonStyle.button)}
					>
						<input type="file" onChange={handleChange} />
						<i className={(styles.fas, styles.fa_camera)} /> Upload
						Photo
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
