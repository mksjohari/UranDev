import React from 'react';
import behance from '../../images/behance.png';
import codesandbox from '../../images/codesandbox.png';
import dribbble from '../../images/dribbble.png';
import figma from '../../images/figma.png';
import github from '../../images/github.png';
import linkedin from '../../images/linkedin.png';
import slack from '../../images/slack.png';
import styles from '../../modules/signUp.module.scss';

const StepThree = () => {
	return (
		<div className={styles.step}>
			<span className={styles.social_icon_span}>
				<img
					className={styles.social_icon}
					src={linkedin}
					alt="Linkedin"
				/>
				<caption>Linkedin</caption>
				<input className="inp-text" placeholder="URL to account" />
			</span>
			<span className={styles.social_icon_span}>
				<img className={styles.social_icon} src={github} alt="Github" />
				<caption>Github</caption>
				<input className="inp-text" placeholder="URL to account" />
			</span>
			<span className={styles.social_icon_span}>
				<img className={styles.social_icon} src={slack} alt="Slack" />
				<caption>Slack</caption>
				<input className="inp-text" placeholder="URL to account" />
			</span>
			<span className={styles.social_icon_span}>
				<img
					className={styles.social_icon}
					src={codesandbox}
					alt="Codesandbox"
				/>
				<caption>Codesandbox</caption>
				<input className="inp-text" placeholder="URL to account" />
			</span>
			<span className={styles.social_icon_span}>
				<img
					className={styles.social_icon}
					src={behance}
					alt="Behance"
				/>
				<caption>Behance</caption>
				<input className="inp-text" placeholder="URL to account" />
			</span>
			<span className={styles.social_icon_span}>
				<img className={styles.social_icon} src={figma} alt="Figma" />
				<caption>Figma</caption>
				<input className="inp-text" placeholder="URL to account" />
			</span>
			<span className={styles.social_icon_span}>
				<img
					className={styles.social_icon}
					src={dribbble}
					alt="Dribbble"
				/>
				<caption>Dribbble</caption>
				<input className="inp-text" placeholder="URL to account" />
			</span>
		</div>
	);
};

export default StepThree;
