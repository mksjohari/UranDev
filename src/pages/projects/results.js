import React, { useState } from 'react';
import { Formik, Field, FieldArray } from 'formik';
import { withContext } from '../../shared/react-dims';

import ResultSection from '../../shared/input/ResultSection';
import Button from '../../shared/sandbox/Button';
import Links from '../../shared/input/Links';

import styles from '../../modules/createProject.module.scss';

function Results(props) {
	const prevStep = props.prevStep;
	const nextStep = props.nextStep;
	const nextText = props.nextText;
	const [linksExpand, setLinksExpand] = useState(true);
	const [sectionExpand, setSectionExpand] = useState(true);
	const toggleLinksExpand = () =>
		setLinksExpand((previousState) => !previousState);
	const toggleSectionExpand = () =>
		setSectionExpand((previousState) => !previousState);
	return (
		<Formik
			initialValues={{
				conclusion: props.results.conclusion, //
				links: props.results.links,
				sections: props.results.sections,
			}}
			validate={validateResults}
			onSubmit={(values, actions) => {
				setTimeout(() => {
					props.editResults(values);
					actions.setSubmitting(false);
				}, 1000);
			}}
		>
			{(props) => (
				<form onSubmit={props.handleSubmit}>
					<div className={styles.child_form}>
						<div className={styles.section_input}>
							<label
								htmlFor="conclusion"
								className={styles.section_question}
							>
								What are the results of your project? What did
								your project achieve? What did you learn? Please
								briefly reflect and conclude your project.
							</label>
							<Field
								as="textarea"
								className={`inp-field ${styles.input_situation}`}
								name="conclusion"
								placeholder="Type here"
							/>
							{props.errors.conclusion &&
							props.touched.conclusion ? (
								<div className={styles.error}>
									{props.errors.conclusion}
								</div>
							) : null}
						</div>
						<br />
						<div>
							<label
								htmlFor="links"
								className={` ${styles.section_header}`}
							>
								<div onClick={toggleLinksExpand}>
									{linksExpand ? (
										<i className="fas fa-angle-up"></i>
									) : (
										<i className="fas fa-angle-down"></i>
									)}
								</div>
								<div className={styles.header_style}>
									Links to project (optional)
								</div>
							</label>
							{linksExpand && (
								<div
									className={`${styles.section_hidden} ${styles.header_style}`}
								>
									<FieldArray
										name="links"
										component={Links}
									/>
								</div>
							)}
						</div>
					</div>
					<br />
					<div>
						<label
							htmlFor="sections"
							className={` ${styles.section_header}`}
						>
							<div onClick={toggleSectionExpand}>
								{sectionExpand ? (
									<i className="fas fa-angle-up"></i>
								) : (
									<i className="fas fa-angle-down"></i>
								)}
							</div>
							<div className={styles.header_style}>
								Sections (optional)
							</div>
						</label>

						{sectionExpand && (
							<div
								className={`${styles.section_hidden} ${styles.header_style}`}
							>
								<div className={styles.section_input}>
									<div
										className={`${styles.section_question}`}
									>
										Here's where you showcase your
										accomplishments! Share your final by
										videos, graphs, pictures, documents, or
										even the product itself (via a link).
									</div>
									<FieldArray
										name="sections"
										component={ResultSection}
									/>
								</div>
							</div>
						)}
					</div>
					<div className={styles.button_footer}>
						<Button
							// type="submit"
							iconL={<i className="fas fa-arrow-left" />}
							text="Back"
							onClick={() => {
								props.handleSubmit();
								prevStep();
							}}
						/>
						<Button
							// type="submit"
							className={styles.save_draft}
							iconR={<i className="fas fa-eye" />}
							text={nextText}
							onClick={() => {
								props.handleSubmit();
								nextStep();
							}}
						/>
					</div>
				</form>
			)}
		</Formik>
	);
}
export default withContext(Results);

const validateResults = (
	values,
	props /* only available when using withFormik */
) => {
	const errors = {};
	var validUrl = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	); // fragment locator

	if (!values.conclusion) {
		errors.conclusion = 'Please enter conclusion.';
	}

	if (values.links.length) {
		values.links.map((link, index) => {
			if (!link.url) {
				errors.links = `Please enter url or remove link #${index + 1}.`;
			} else if (!validUrl.test(link.url)) {
				errors.links = `Please change invalid link #${index + 1}.`;
			}
			return null;
		});
	}

	if (values.sections.length) {
		values.sections.map((section, index) => {
			if (!section.description) {
				errors.sections = `description`;
			}
			if (
				section.sectionLink.url &&
				!validUrl.test(section.sectionLink.url)
			) {
				errors.sections = `url`;
			}
			return null;
		});
	}

	return errors;
};
