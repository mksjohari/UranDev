import React from 'react';
import styles from '../../modules/signUp.module.scss';
import Button from '../../shared/sandbox/Button';

const StepFour = () => {
	return (
		<div className={styles.step}>
			<h2>
				Almost there, let's confirm
				<br />
				your account details.
			</h2>
			<Button text="Finish Sign Up!" />
		</div>
	);
};

export default StepFour;
