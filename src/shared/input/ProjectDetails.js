import React from 'react';
import { Formik, Field } from 'formik';

import Button from '../sandbox/Button';
import { close } from '../sandbox/Popup';
import SegmentTab from './SegmentTab';

import styles from '../../modules/popup.module.scss';

function ProjectDetails(props) {
	const pid = props.project.pid;

	return (
		<div className={styles.form_container}>
			<Formik
				initialValues={{
					status: props.project.status,
					sharing: props.project.sharing,
					title: props.project.title,
				}}
				onSubmit={(values, actions) => {
					setTimeout(() => {
						props.editProjectDetails(values);
						actions.setSubmitting(false);
					}, 1000);
				}}
			>
				{(props) => (
					<form
						onSubmit={props.handleSubmit}
						className={styles.form}
						style={{ width: window.innerWidth * 0.4 }}
					>
						<h3>Create Project</h3>
						<div className={styles.root_column}>
							{/* <div className={styles.section_columns}>
								<label
									htmlFor="status"
									className={styles.subtitle}
								>
									Project status:
								</label>
								<Field
									as={SegmentTab}
									options={['Ongoing', 'Completed']}
									name="status"
								/>
							</div>
							<br /> */}
							<div className={styles.section_columns}>
								<label
									htmlFor="sharing"
									className={styles.subtitle}
								>
									Sharing:
								</label>
								<Field
									as={SegmentTab}
									options={['Public', 'Unlisted']}
									name="sharing"
								/>
							</div>
							<br />
							<div className={styles.root_column}>
								<label
									htmlFor="title"
									className={styles.subtitle}
								>
									Give this project a title.
								</label>
								<Field
									as="input"
									name="title"
									className={`inp-field`}
									placeholder="Title of your masterpiece..."
								/>
							</div>
							<br />
						</div>
						<div className={styles.btnsRow}>
							<Button
								text="Confirm"
								id={pid + '_confirm'}
								colour="reddo"
								iconR={<i className="fas fa-check"></i>}
								onClick={(e) => {
									props.submitForm();
									close(e, '_confirm');
								}}
							/>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
}

export default ProjectDetails;
