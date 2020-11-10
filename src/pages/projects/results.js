import React, { useState } from 'react';
import { Formik, Field, FieldArray } from 'formik';
import { withContext } from '../../shared/react-dims';

import ResultSection from '../../shared/input/ResultSection';
import Button from '../../shared/sandbox/Button';
import Links from '../../shared/input/Links';

import styles from '../../modules/createProject.module.scss';

function Results(props) {
	const [linksExpand, setLinksExpand] = useState(true);
	const [sectionExpand, setSectionExpand] = useState(true);
	const toggleLinksExpand = () =>
		setLinksExpand((previousState) => !previousState);
	const toggleSectionExpand = () =>
		setSectionExpand((previousState) => !previousState);
	return (
		<Formik
			initialValues={{
				conclusion: props.results.conclusion,
				links: props.results.links,
				sections: props.results.sections,
			}}
			onSubmit={(values, actions) => {
				setTimeout(() => {
					props.editResults(values);
					actions.setSubmitting(false);
					props.finishProject();
				}, 1000);
			}}
		>
			{(props) => (
				<form onSubmit={props.handleSubmit}>
					<div className={styles.section_input}>
						<label
							htmlFor="conclusion"
							className={styles.section_question}
						>
							What are the results of your project? What did your
							project achieve? What did you learn?Please briefly
							reflect and conclude your project.
						</label>
						<Field
							as="textarea"
							className={`inp-field ${styles.input_situation}`}
							name="conclusion"
							placeholder="Type here"
						/>
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
							<FieldArray name="links" component={Links} />
						)}
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
							<div className={styles.section_input}>
								<div className={`${styles.section_question}`}>
									Here's where you showcase your
									accomplishments! Share your final by videos,
									graphs, pictures, documents, or even the
									product itself (via a link).
								</div>
								<FieldArray
									name="sections"
									component={ResultSection}
								/>
							</div>
						)}
					</div>
					<div className={styles.button_footer}>
						<Button
							type="submit"
							className={styles.save_draft}
							iconR={<i className="fas fa-flag" />}
							text="Complete Project"
						/>
					</div>
				</form>
			)}
		</Formik>
	);
}
export default withContext(Results);
