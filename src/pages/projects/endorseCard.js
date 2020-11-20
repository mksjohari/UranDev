import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../modules/endorseCard.module.scss';

const EndorseCard = (props) => {
	const user = props.user;
	return (
		<div className={styles.section_card}>
			<div className={styles.imageContainer}>
				<Link to={`/users/${user.uid}`}>
					<img
						className={styles.profile_pic}
						src={user.photoUrl}
						alt="profile"
					/>
				</Link>
			</div>
			<div className={styles.endorseInfo}>
				<div
					style={{
						borderBottom: '1px solid lightgrey',
						padding: '0 0 2px 0',
					}}
				>
					<h6>{user.name}</h6>
					<div>
						Skills Endorsed:{' '}
						{user.skills.map((skill, index) => (
							<span key={index} className={styles.skill}>
								{skill}
							</span>
						))}
					</div>
					<div>
						Tools Endorsed:{' '}
						{user.tools.map((tools, index) => (
							<span key={index} className={styles.tool}>
								{tools}
							</span>
						))}
					</div>
				</div>
				<div style={{ padding: '2px 0 0 0' }}>
					<span>{user.comment}</span>
				</div>
			</div>
		</div>
	);
};

export default EndorseCard;
