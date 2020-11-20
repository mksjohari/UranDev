import React from 'react';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';

import { close } from '../sandbox/Popup';
import Button from '../../shared/sandbox/Button';

import styles from '../../modules/endorseList.module.scss';
import popup from '../../modules/popup.module.scss';
import { addEndorsement } from '../firebase/firebase';

const mapStateToProps = (state) => {
	return { user: state.user };
};

function EndorseList(props) {
	const skills = props.skills;
	const tools = props.tools;
	const data = props.data;
	const user = props.user;
	const projectUser = props.projectUser;
	const endorsement = {
		uid: user.uid,
		comment: '',
		skills: [],
		tools: [],
		date: new Date().getTime(),
		photoUrl: user.photoUrl,
		name: `${user.firstName} ${user.lastName}`,
	};

	return (
		<div className={popup.form_container}>
			<div className={styles.title}>
				<i className={' fas fa-medal'}></i>
				<h3>Endorse: {data.title}</h3>
			</div>
			Un-check them if you wish to revoke your endorsement.
			<Formik
				initialValues={{
					endorseSkills: endorsement.skills,
					endorseTools: endorsement.tools,
					comment: endorsement.comment,
				}}
				// validate={validateSituation}
				onSubmit={async (values, actions) => {
					const newEndorse = {
						uid: user.uid,
						comment: values.comment, //
						skills: values.endorseSkills, //
						tools: values.endorseTools, //
						date: new Date().getTime(),
						photoUrl: user.photoUrl,
						name: `${user.firstName} ${user.lastName}`,
					};

					props.editEndorsements(newEndorse);
					await addEndorsement(
						user.uid,
						projectUser,
						data.pid,
						newEndorse
					);
					actions.setSubmitting(false);
				}}
			>
				{(props) => (
					<form onSubmit={props.handleSubmit}>
						<div className={styles.skillsToolsContainer}>
							<div className={styles.listContainer}>
								<label htmlFor="endorseSkills">
									<h6>Endorse project Skills:</h6>
								</label>
								{skills.map((skill, index) => (
									<label
										key={index}
										className={styles.checkbox_row}
									>
										<Field
											type="checkbox"
											name="endorseSkills"
											value={skill}
										/>
										<span className={styles.left_padding}>
											{skill}
										</span>
										<br />
									</label>
								))}
							</div>
							<div className={styles.listContainer}>
								<label htmlFor="endorseTools">
									<h6>Endorse project Tools:</h6>
								</label>
								{tools.map((tool, index) => (
									<label
										key={index}
										className={styles.checkbox_row}
									>
										<Field
											type="checkbox"
											name="endorseTools"
											value={tool}
										/>
										<span className={styles.left_padding}>
											{tool}
										</span>
										<br />
									</label>
								))}
							</div>
						</div>
						<div className={styles.listContainer}>
							<label htmlFor="endorseSkills">
								<h6>Write a comment (optional).</h6>
							</label>
							<Field
								as="textarea"
								className={`inp-field`}
								style={{ width: '100%' }}
								name="comment"
								placeholder="Type here"
							/>
						</div>
						<div className={popup.btnsRow}>
							<Button
								id={data.pid + '_confirm'}
								text="Endorse"
								colour="yellow"
								iconR={<i className="fas fa-check"></i>}
								onClick={(e) => {
									props.submitForm(e);
									!Object.keys(props.errors).length &&
										close(e, '_confirm');
								}}
							/>
							<Button
								id={data.pid + '_close'}
								text="Cancel"
								// iconR={<i className="fas fa-times"></i>}
								onClick={(e) => {
									props.resetForm();
									close(e, '_close');
								}}
							/>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
}

export default connect(mapStateToProps)(EndorseList);
