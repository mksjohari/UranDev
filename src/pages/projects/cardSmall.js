import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../modules/projects.module.scss';

function CardSmall(props) {
	return (
		<Link to={`/users/${props.uid}/projects/${props.preview.pid}`}>
			<div className={styles.card_small}>
				<div className={styles.row_section}>
					<div className={styles.row_top}>
						<img
							className={styles.cover_photo}
							src={require('../../images/jobsearch.png')}
							alt="project"
						/>
					</div>
					<div className={styles.row_bottom}>
						<div className={styles.card_title}>
							{props.preview.title}
						</div>
						<div className={styles.card_detail}>
							<div className={styles.card_text}>
								<i className="far fa-calendar"></i>
								<span className={styles.card_text}>
									01/01/2011 - 20/03/2020
								</span>
							</div>
							<div className={styles.card_text}>
								<i className="fas fa-suitcase"></i>
								<span className={styles.card_text}>
									{props.preview.role}
								</span>
							</div>
						</div>
						<div className={styles.card_tags}>
							Skills ... Tools ...
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
export default CardSmall;
