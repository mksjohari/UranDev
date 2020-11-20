import React from 'react';
import { Field } from 'formik';

import Dropdown from '../../shared/sandbox/Dropdown';
import Button from '../sandbox/Button';
import { close } from '../sandbox/Popup';
import Droparea from '../sandbox/Droparea';

import popup from '../../modules/popup.module.scss';
import styles from '../../modules/createProject.module.scss';

const dropdownConverter = (data) => {
	const output = [];
	if (data && data.length) {
		data.map((item, index) =>
			item.value ? output.push(item.value) : output.push(item)
		);
	}
	return output;
};

function ActionForm(props) {
	const actionId = props.newAction ? 'newAction' : props.action.actionId;

	return (
		<div className={popup.form_container}>
			<div
				className={popup.form}
				style={{ width: window.innerWidth * 0.6 }}
			>
				<h3>Edit Action</h3>
				<div>
					<div className={popup.root_column}>
						<label htmlFor="title" className={popup.subtitle}>
							Give this action a title.
						</label>
						<Field
							as="input"
							name={`tasks[${props.currentTask}].actions[${props.index}].title`}
							className={`inp-field`}
							placeholder="Title of your action..."
						/>

						{props.errors && props.errors === 'actionTitle' ? (
							<div className={styles.error}>
								Please enter an action title.
							</div>
						) : null}
					</div>
					<br />

					<label htmlFor="tools" className={popup.subtitle}>
						What tool(s) did you use?
					</label>
					<Field
						name={`tasks[${props.currentTask}].actions[${props.index}].tools`}
					>
						{({ field: { value }, form: { setFieldValue } }) => (
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
									setFieldValue(
										`tasks[${props.currentTask}].actions[${props.index}].tools`,
										dropdownConverter(v)
									)
								}
							/>
						)}
					</Field>
					<br />
					<label htmlFor="skills" className={popup.subtitle}>
						What Skill(s) allowed you to do this?
					</label>
					<Field
						name={`tasks[${props.currentTask}].actions[${props.index}].skills`}
					>
						{({ field: { value }, form: { setFieldValue } }) => (
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
									setFieldValue(
										`tasks[${props.currentTask}].actions[${props.index}].skills`,
										dropdownConverter(v)
									);
								}}
							/>
						)}
					</Field>
					<br />
					<label htmlFor="description" className={popup.subtitle}>
						Describe your action in detail.
					</label>
					<Field
						as="textarea"
						name={`tasks[${props.currentTask}].actions[${props.index}].description`}
						className={`inp-field ${popup.descEdit}`}
						placeholder="Give this action a description."
					/>
					{props.errors && props.errors === 'actionDescription' ? (
						<div className={styles.error}>
							Please describe your action.
						</div>
					) : null}
					<br />
					<label htmlFor="files" className={popup.subtitle}>
						Add files to show your work in progress. (Optional, max
						10 files)
					</label>
					<Field
						as={Droparea}
						name={`tasks[${props.currentTask}].actions[${props.index}].files`}
					/>
				</div>
				<br />
				<div className={popup.btnsRow}>
					<Button
						id={actionId + '_confirm'}
						text="Confirm"
						colour="reddo"
						iconR={<i className="fas fa-check"></i>}
						onClick={(e) => {
							// props.submitForm(e);
							// !Object.keys(props.errors).length &&
							close(e, '_confirm');
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default ActionForm;

const Options = {
	tools: [],
	skills: [],
};
