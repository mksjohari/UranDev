import React, { useState } from 'react';
import moment from 'moment';
import { addSkillsTools } from '../../actions/userAction';
import Developer from '../../images/developer.svg';
import Button from '../../shared/sandbox/Button';
import Carousel from '../../shared/sandbox/Carousel';
import ReadonlyDnD from '../../shared/reactDnD/readonlyDnD';
import PDFPreview from '../../shared/sandbox/PDFPreview';

import project from '../../modules/previewProject.module.scss';
import styles from '../../modules/createProject.module.scss';
import buttonStyle from '../../modules/_button.module.scss';
import dnd from '../../modules/DnD.module.scss';
import header from '../../modules/header.module.scss';
import { connect } from 'react-redux';

export function SectionGrid(props) {
	return (
		<div className={styles.section_grid}>
			<div className={styles.section_left}>
				<div className={styles.section_desc}>
					{props.section.description}
				</div>
				{props.section.sectionLink.url ? (
					<a
						className={`${styles.section_link}`}
						href={props.section.sectionLink.url}
					>
						<i className="fas fa-link" />
						<div className={styles.link_text}>
							{props.section.sectionLink.linkName}
						</div>
					</a>
				) : (
					''
				)}
			</div>
			<div className={styles.section_right}>
				<div className={dnd.carousel_display}>
					<Carousel files={props.section.files} />
				</div>
			</div>
		</div>
	);
}
export function SectionGridless(props) {
	return (
		<div className={styles.section_left}>
			<div className={styles.section_desc}>
				{props.section.description}
			</div>
			{props.section.sectionLink.url ? (
				<a
					className={`${styles.section_link}`}
					href={props.section.sectionLink.url}
				>
					<i className="fas fa-link" />
					<div className={styles.link_text}>
						{props.section.sectionLink.linkName}
					</div>
				</a>
			) : (
				''
			)}
			{props.section.files[0] && (
				<div className={styles.pdf_display}>
					<PDFPreview file={props.section.files[0]} preview />
				</div>
			)}
		</div>
	);
}

// export const SectionRender = (props) => {
// 	return (
// 		<div className={`${project.top_margin}`}>
// 			{props.sections.map((section, index) => {
// 				if (section.files.length > 0) {
// 					if (section.files[0].type.match(/image/g)) {
// 						return <SectionGrid section={section} />; // images
// 					} else {
// 						return <SectionGridless section={section} />; //pdf
// 					}
// 				} else {
// 					return <SectionGridless section={section} />; //text
// 				}
// 			})}
// 		</div>
// 	);
// };

function PreviewProject(props) {
	const [overview, setOverview] = useState(true);
	const situation = props.project.situation;
	const results = props.project.results;

	return (
		<div>
			<div
				className={`${styles.section_question} ${styles.section_input}`}
			>
				Your portfolio is ready to be published. Review your inputs and
				add a cover photo that captures the essence of your project!
				(optional)
			</div>
			<div className={project.cover_div}>
				<label
					className={`${buttonStyle.cover_btn} ${buttonStyle.button} ${project.cover_button}`}
				>
					<input type="file" onChange={props.editCover} />
					<i className="fas fa-camera" style={{ marginRight: 5 }} />
					Upload Cover
				</label>
				<img
					src={props.project.cover.img}
					alt="jobsearch"
					style={{ width: '100%' }}
				></img>
				<div className={project.banner}>
					<div className={project.project_title}>
						{props.project.title}
					</div>
					<div className={project.details}>
						<i
							className="far fa-calendar"
							style={{ margin: '10px' }}
						/>
						{`${situation.projectDates.startDate.format(
							'MMM Do YYYY'
						)} - ${situation.projectDates.endDate.format(
							'MMM Do YYYY'
						)}`}
					</div>
				</div>
			</div>
			<div className={`${header.tabBottom}`}>
				<span
					className={`${header.projectTab} ${
						overview ? header.activeProjectTab : ''
					}`}
					onClick={() => setOverview(true)}
				>
					Situation & Results
				</span>

				<span
					className={`${header.projectTab} ${
						!overview ? header.activeProjectTab : ''
					}`}
					onClick={() => setOverview(false)}
				>
					Tasks & Actions
				</span>
			</div>
			{overview ? (
				<div className={project.project_ctn}>
					<div className={project.project_section}>
						<h1 className={project.h1}>Situation</h1>
						<div className={project.situation_grid}>
							<div className={project.summary_div}>
								{situation.summary}
							</div>
							<div
								className={`${project.stats_div} ${project.stats_text}`}
							>
								<div className={project.stats}>
									<div className={project.icon_text}>
										<i className="far fa-user" />
										<div className={project.left_margin}>
											Team Size
										</div>
									</div>
									<div className={project.details}>
										{situation.teamSize}
									</div>
								</div>
								<div className={project.stats}>
									<div className={project.icon_text}>
										<i className="fas fa-dollar-sign" />
										<div className={project.left_margin}>
											Budget
										</div>
									</div>
									<div className={project.details}>
										{situation.budget
											? `${situation.budget} ${situation.currency.value}`
											: 'No budget'}
									</div>
								</div>
								<div className={project.stats}>
									<div className={project.icon_text}>
										<i className="far fa-clock" />
										<div className={project.left_margin}>
											Duration
										</div>
									</div>
									<div className={project.details}>
										{moment
											.duration(
												situation.projectDates.endDate.diff(
													situation.projectDates
														.startDate
												)
											)
											.humanize({ d: 7, w: 4 })}
									</div>
								</div>
							</div>

							<div className={project.user_div}>
								<img
									src={props.user.photoUrl}
									alt="jobsearch"
									className={project.profile_pic}
								></img>
								<div
									className={project.name}
								>{`${props.user.firstName} ${props.user.lastName}`}</div>
								<div className={project.details}>
									{situation.role}
								</div>
							</div>
						</div>
					</div>
					{/* <h1 className={project.h1}>Tasks & Actions</h1> */}
					<div className={project.project_section}>
						<h1 className={project.h1}>Results</h1>
						<div className={project.conclusion_grid}>
							<div className={project.results_links}>
								{results.links.length
									? results.links.map((link, index) => (
											<a
												className={`${styles.section_link}`}
												href={link.url}
											>
												<i className="fas fa-link" />
												<div
													className={styles.link_text}
												>
													{link.linkName}
												</div>
											</a>
									  ))
									: ''}
							</div>
							<div className={project.conclusion}>
								{results.conclusion}
							</div>
						</div>
						{results.sections.length > 0 &&
							results.sections.map((section, index) => {
								if (section.files.length > 0) {
									if (section.files[0].type.match(/image/g)) {
										return (
											<SectionGrid section={section} />
										);
									} else {
										return (
											<SectionGridless
												section={section}
											/>
										);
									}
								} else {
									return (
										<SectionGridless section={section} />
									);
								}
							})}
					</div>
				</div>
			) : (
				<div className={project.project_ctn}>
					<div className={project.project_section}>
						<h1 className={project.h1}>Tasks & Actions</h1>
						<ReadonlyDnD data={props.project.tasks} />
					</div>
				</div>
			)}
			<div
				className={`${project.center} ${project.top_margin} ${project.details}`}
			>
				End of preview
			</div>
			<div className={project.center}>
				<img
					src={Developer}
					alt="Developer"
					className={project.preview_end}
				/>
			</div>
			<div className={styles.button_footer}>
				<Button
					iconL={<i className="fas fa-arrow-left" />}
					text="Back"
					onClick={props.prevStep}
				/>
				<Button
					className={styles.save_draft}
					iconR={<i className="fas fa-flag" />}
					text="Complete Project"
					onClick={() => props.finishProject(props.addSkillsTools)}
				/>
			</div>
		</div>
	);
}

export default connect(mapStateToProps, { addSkillsTools })(PreviewProject);

function mapStateToProps(state) {
	return { user: state.user };
}
