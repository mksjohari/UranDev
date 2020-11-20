import React from 'react';

import styles from '../modules/footer.module.scss';

const Footer = () => {
	return (
		<div className={styles.footer}>
			<p className={styles.text}>Made with <span className={styles.symbol}>♥︎</span> by Uran.</p>
		</div>
	);
};

export default Footer;
