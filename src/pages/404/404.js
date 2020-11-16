import React from 'react';
import styles from '../../modules/page404.module.scss';
import Button from '../../shared/sandbox/Button';
import Error from '../../images/404error.svg';

const Page404 = () => {
	function goHome() {
		window.location.replace('/');
	}

	return (
		<div className={styles.container}>
			<img className={styles.errorimg} src={Error} alt="404" />
			<Button
				text="Go to homepage"
				colour="blue"
				iconR={<i className="fas fa-home"></i>}
				onClick={goHome}
			/>
		</div>
	);
};

export default Page404;
