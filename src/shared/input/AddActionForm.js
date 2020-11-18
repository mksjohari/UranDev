import React from 'react';
import { Formik, Field } from 'formik';

import Dropdown from '../../shared/sandbox/Dropdown';
import Button from '../sandbox/Button';
import { close } from '../sandbox/Popup';
import Droparea from '../sandbox/Droparea';

import popup from '../../modules/popup.module.scss';
import styles from '../../modules/createProject.module.scss';

const dropdownConverter = (data) => {
	const output = [];
	if (data.length) {
		data.map((item, index) =>
			item.value ? output.push(item.value) : output.push(item)
		);
	}
	return output;
};

function AddActionForm(props) {
	const actionId = props.newAction ? 'newAction' : props.action.actionId;
	return (
		<div className={popup.form_container}>
			<Formik
				initialValues={{
					title: props.action.title,
					description: props.action.description,
					tools: props.action.tools,
					skills: props.action.skills,
					files: props.action.files,
				}}
				validate={validateActionForm}
				onSubmit={(values, actions) => {
					const tools = dropdownConverter(values.tools);
					const skills = dropdownConverter(values.skills);
					props.editAction(values, tools, skills);
					actions.setSubmitting(false);
					actions.resetForm();
				}}
			>
				{(props) => (
					<form
						onSubmit={props.handleSubmit}
						onReset={props.handleReset}
						className={popup.form}
						style={{ width: window.innerWidth * 0.6 }}
					>
						{/* {console.log(props)} */}
						<h3>Edit Action</h3>
						<div>
							<div className={popup.root_column}>
								<label
									htmlFor="title"
									className={popup.subtitle}
								>
									Give this action a title.
								</label>
								<Field
									as="input"
									name="title"
									className={`inp-field`}
									placeholder="Title of your action..."
								/>
								{props.errors.title ? (
									<div className={styles.error}>
										{props.errors.title}
									</div>
								) : null}
							</div>
							<br />

							<label htmlFor="tools" className={popup.subtitle}>
								What tool(s) did you use?
							</label>
							<Field name="tools">
								{({
									field: { value },
									form: { setFieldValue },
								}) => (
									<Dropdown
										id={actionId + '_tools'}
										options={Options.tools}
										isMulti
										isCreatable
										colour="white"
										defaultValue={
											value &&
											value.map((tool) => ({
												value: tool,
												label: tool,
											}))
										}
										keyColour="#AFDEE9"
										onChange={(v) =>
											setFieldValue('tools', v)
										}
									/>
								)}
							</Field>
							<br />
							<label htmlFor="skills" className={popup.subtitle}>
								What Skill(s) allowed you to do this?
							</label>
							<Field name="skills">
								{({
									field: { value },
									form: { setFieldValue },
								}) => (
									<Dropdown
										id={actionId + '_tools'}
										options={Options.skills}
										isMulti
										isCreatable
										colour="white"
										defaultValue={
											value &&
											value.map((skill) => ({
												value: skill,
												label: skill,
											}))
										}
										onChange={(v) => {
											setFieldValue('skills', v);
										}}
									/>
								)}
							</Field>
							<br />
							<label
								htmlFor="description"
								className={popup.subtitle}
							>
								Describe your action in detail.
							</label>
							<Field
								as="textarea"
								name="description"
								className={`inp-field ${popup.descEdit}`}
								placeholder="Give this action a description."
							/>
							{props.errors.description ? (
								<div className={styles.error}>
									{props.errors.description}
								</div>
							) : null}
							<br />
							<label htmlFor="files" className={popup.subtitle}>
								Add files to show your work in progress.
								(Optional, max 10 files)
							</label>
							<Field as={Droparea} name="files" />
						</div>
						<br />
						<div className={popup.btnsRow}>
							<Button
								id={actionId + '_confirm'}
								text="Confirm"
								colour="reddo"
								iconR={<i className="fas fa-check"></i>}
								onClick={(e) => {
									props.submitForm(e);
									!Object.keys(props.errors).length &&
										close(e, '_confirm');
								}}
							/>
							<Button
								id={actionId + '_close'}
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

export default AddActionForm;

const Options = {
	tools: [],
	skills: [],
};

const validateActionForm = (
	values,
	props /* only available when using withFormik */
) => {
	const errors = {};

	if (!values.title) {
		errors.title = 'Please enter an action title.';
	}
	if (!values.description) {
		errors.description = 'Please enter a description.';
	}

	return errors;
};
