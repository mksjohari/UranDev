import React from 'react';
import { Field, useField } from 'formik';
import Button from '../../shared/sandbox/Button';
import styles from '../../modules/createProject.module.scss';

function Links(props) {
	const [meta] = useField(props.name);

	const { form, push, remove } = props;
	const { value } = meta;
	return (
		<div className={styles.section_input}>
			{value.map((link, index) => (
				<div key={index} className={styles.section_input_row}>
					<label htmlFor="url" className={styles.section_question}>
						{index + 1})
					</label>
					<Field
						as="input"
						className={`inp-field ${styles.input_link}`}
						name={`links[${index}].url`}
						placeholder="URL"
					/>
					<Field
						as="input"
						className={`inp-field ${styles.input_link}`}
						name={`links[${index}].linkName`}
						placeholder="link name (optional)"
					/>
					<div
						className={` ${styles.icon_trash}`}
						type="button"
						onClick={() => remove(index)}
					>
						<i className="fas fa-trash-alt"></i>
						<div className={styles.button_text}>Remove</div>
					</div>
				</div>
			))}
			<div className={styles.section_input_row}>
				{form.errors.links && form.touched.links ? (
					<div className={styles.error}>{form.errors.links}</div>
				) : null}
			</div>
			<Button
				colour="pink"
				type="button"
				onClick={() =>
					push({
						url: '',
						linkName: '',
					})
				}
				className={`${styles.save_draft} ${styles.center}`}
				iconR={<i className="fas fa-plus"></i>}
				text="Add link to project"
			/>
		</div>
	);
}
export default Links;
