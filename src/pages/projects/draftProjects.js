import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../modules/draftProject.module.scss';

function DraftProjects(props) {
	return (
		<div className={styles.root}>
			<div className={styles.frame}>
				<div>
					<Link className={styles.back_link} to="/projects">
						<i className="fas fa-chevron-left"></i>
						Back
					</Link>
				</div>
				<div className={styles.drafts_bg}>
					<div>
						<div className={styles.add_project}>Add Project</div>
						<div className={styles.text}>
							We use the STAR (Situation, Task, Action, Result)
							model to help you build a clear, distinct, and
							informative portfolio.
						</div>
					</div>

					<div
						className={`${styles.drafts_scroll} ${styles.drafts_scrollbar}`}
					>
						<div
							className={`${styles.drafts_line} ${styles.drafts_row}`}
						>
							<Link className={styles.project_round} to="/create">
								<div className={styles.round}>
									<i className="fas fa-plus fa-2x"></i>
								</div>
								<div className={styles.draft_text}>
									New project
								</div>
							</Link>
						</div>
						<div className={styles.drafts_row}>
							<Link className={styles.project_round} to="/create">
								<div className={styles.round}></div>
								<div className={styles.draft_text}>Draft 1</div>
							</Link>
							<Link className={styles.project_round} to="/create">
								<div className={styles.round}></div>
								<div className={styles.draft_text}>Draft 2</div>
							</Link>
							<Link className={styles.project_round} to="/create">
								<div className={styles.round}></div>
								<div className={styles.draft_text}>Draft 3</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default DraftProjects;
