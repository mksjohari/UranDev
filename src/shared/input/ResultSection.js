import React, { useState } from 'react';
import { Field, useField } from 'formik';

import Button from '../sandbox/Button';
import { close, lockBg } from '../sandbox/Popup';
import Droparea from '../sandbox/Droparea';
import Alert from '../sandbox/Alert';
import Carousel from '../sandbox/Carousel';

import styles from '../../modules/createProject.module.scss';
import dnd from '../../modules/DnD.module.scss';
import popup from '../../modules/popup.module.scss';

function ResultSection(props) {
	const [popupId, setpopupId] = useState('newSection');
	const [meta] = useField(props.name);

	const { form, push, remove } = props;
	const { value } = meta;
	// const initialValues = useState(value)
	// const reset = (index) => {
	//     props.form.setFieldValue("sections", initialValues[index]);
	// }
	return (
		<div className={styles.section_input}>
			{value.map((section, index) => {
				return (
					<div
						className={styles.section_card}
						key={section.sectionId}
					>
						<div className={styles.section_grid}>
							<div className={styles.section_left}>
								{section.description}
								{/* {section.sectionLink.url ? (
									<a
										href={`${styles.section.sectionLink.url} ${styles.section_link}`}
									>
										<i className="fas fa-link" />
										{section.sectionLink.linkName}
									</a>
								) : (
									''
								)} */}
							</div>
							<div className={styles.section_right}>
								{section.files.length ? (
									<div className={dnd.carousel_display}>
										<Carousel files={section.files} />
									</div>
								) : (
									''
								)}
							</div>
						</div>
						<div className={styles.section_footer}>
							<Button
								colour="reddo"
								id={'delSection'}
								iconL={<i className="fas fa-trash-alt"></i>}
								text="Delete section"
								onClick={lockBg}
							/>
							<Button
								id={section.sectionId}
								iconL={<i className="fas fa-edit"></i>}
								text="Edit section"
								onClick={lockBg}
							/>
						</div>
						<div
							className={popup.popupContainer}
							id={'delSection_popContent'}
						>
							<Alert
								id={'delSection'}
								type="result section"
								hasConfirm
								confirmBtnLabel="Yes, delete"
								closeBtnLabel="No, go back"
								onConfirm={() => remove(index)}
							/>
						</div>
						<div
							className={`${popup.popupContainer}`}
							id={section.sectionId + '_popContent'}
						>
							<div
								className={`${popup.form_container}`}
								style={{ width: window.innerWidth * 0.6 }}
							>
								<h3>Edit Result Section</h3>
								<label
									htmlFor="description"
									className={popup.subtitle}
								>
									Describe your section in detail.
								</label>
								<Field
									as="textarea"
									name={`sections[${index}].description`}
									className={`inp-field ${popup.descEdit}`}
									placeholder="Write what this section is about ..."
								/>
								{form.errors.sections &&
								form.errors.sections == 'description' ? (
									<div className={styles.error}>
										Please enter a section description.
									</div>
								) : null}
								<br />
								<label
									htmlFor="sectionLink"
									className={popup.subtitle}
								>
									Add an link to external sources.
								</label>
								<div className={styles.input_teamsize}>
									<Field
										as="input"
										className={`inp-field ${styles.input_link_left}`}
										name={`sections[${index}].sectionLink.url`}
										placeholder="URL"
									/>
									<Field
										as="input"
										className={`inp-field ${styles.input_link_left}`}
										name={`sections[${index}].sectionLink.linkName`}
										placeholder="link name (optional)"
									/>
								</div>
								{form.errors.sections &&
								form.errors.sections == 'url' ? (
									<div className={styles.error}>
										Please change invalid link.
									</div>
								) : null}
								<br />
								<label
									htmlFor="title"
									className={popup.subtitle}
								>
									Upload at most 3 files to showcase your work
									(.mp4, .png, .jpeg)
								</label>
								<Field
									as={Droparea}
									name={`sections[${index}].files`}
								/>
								<br />
								<div className={popup.btnsRow}>
									<Button
										text="Confirm"
										id={section.sectionId + '_confirm'}
										colour="reddo"
										iconR={<i className="fas fa-check"></i>}
										onClick={(e) => {
											push({
												sectionId: `section-${new Date().getTime()}`,
												description:
													'Add your description here...',
												files: [],
												sectionLink: {
													url: '',
													linkName: '',
												},
											});
											close(e, '_confirm');
										}}
									/>
									{/* <Button
                                        id={section.sectionId + "_close"}
                                        text="Cancel"
                                        // iconR={<i className="fas fa-times"></i>}
                                        onClick={(e) => {
                                            // reset(index);
                                            close(e, "_close");
                                        }}
                                    /> */}
								</div>
							</div>
						</div>
					</div>
				);
			})}
			<Button
				id={'newSection'}
				colour="pink"
				type="button"
				onClick={lockBg}
				className={`${styles.save_draft} ${styles.center}`}
				iconR={<i className="fas fa-plus"></i>}
				text="Add result section"
			/>
		</div>
	);
}

export default ResultSection;
