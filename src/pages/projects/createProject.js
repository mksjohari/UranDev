import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { withContext } from '../../shared/react-dims';

import Button from '../../shared/sandbox/Button';
import Timeline from '../../shared/sandbox/Timeline';
import { lockBg } from '../../shared/sandbox/Popup';
import ProjectDetails from '../../shared/input/ProjectDetails';
import Situation from './situation';
import TasksActions from './tasksActions';
import Results from './results';
import Preview from './previewProject';

import popup from '../../modules/popup.module.scss';
import styles from '../../modules/createProject.module.scss';
import {
	uploadProject,
	addSkillsAndTools,
} from '../../shared/firebase/firebase';
import { useHistory } from 'react-router-dom';

function mapStateToProps(state) {
	return { user: state.user };
}

async function addSkillsToolsSQL(user, project) {
	var skills = [];
	var tools = [];
	const date = new Date().getTime();
	project.tasks.forEach((task) => {
		task.actions.forEach((action) => {
			action.skills.forEach((skill) => {
				skills.push({
					uuid: user.uuid,
					uid: user.uid,
					skill,
					created: date.toString(),
				});
			});
			action.tools.forEach((tool) => {
				tools.push({
					uuid: user.uuid,
					uid: user.uid,
					tool,
					created: date.toString(),
				});
			});
		});
	});
	await addSkillsAndTools({ skills, tools });
}

function CreateProject(props) {
	const [percent, setPercent] = useState(0);
	const [step, setStep] = useState(0);
	const [project, setProject] = useState(projectData);
	const history = useHistory();
	useEffect(() => {
		setProject(projectData);
		setProject({
			...projectData,
			pid: `${Math.floor(Math.random() * Math.pow(10, 6))}-${Math.floor(
				Math.random() * Math.pow(10, 6)
			)}-${Math.floor(Math.random() * Math.pow(10, 6))}-${Math.floor(
				Math.random() * Math.pow(10, 6)
			)}`,
		});
	}, []);
	function nextStep(props) {
		if (step < 3) {
			setPercent((step * 100 + 100) / 3);
			setStep(step + 1);
		}
	}
	function prevStep() {
		if (step > 0) {
			setPercent((step * 100 - 100) / 3);
			setStep(step - 1);
		}
	}
	// function addSection(values) {
	// 	const newSections = [...project.results.sections, values];
	// 	const newProject = { ...project };
	// 	newProject.results.sections = newSections;
	// 	setProject(newProject);
	// }
	function editProjectDetails(values) {
		const newProject = { ...project };
		newProject.status = values.status;
		newProject.visibility = values.visibility;
		newProject.title = values.title;
		setProject(newProject);
	}
	function editSituation(values) {
		const newProject = { ...project };
		newProject.situation = values;
		setProject(newProject);
	}
	function editTasks(values) {
		const newProject = { ...project };
		newProject.tasks = values;
		setProject(newProject);
	}
	function editResults(values) {
		const newProject = { ...project };
		newProject.results = values;
		setProject(newProject);
	}
	function editCover(event) {
		const newProject = { ...project };
		newProject.cover.imgSrc = event.target.files[0];
		newProject.cover.img = newProject.cover.img = URL.createObjectURL(
			event.target.files[0]
		);
		newProject.cover.changed = true;
		setProject(newProject);
	}
	// function editSections(index, values) {
	//     const newSections = [...project.results.sections];
	//     newSections[index].description = values.description;
	//     newSections[index].sectionLink = values.sectionLink;
	//     newSections[index].files = values.files;
	//     const newProject = { ...project };
	//     newProject.results.sections[index] = newSections;
	//     setProject(newProject);
	// }
	const uploadToFirestore = async (addSkillsTools) => {
		console.log(project);
		uploadProject(props.user.uid, project, addSkillsTools);
		history.push(`users/${props.user.uid}`);
		addSkillsToolsSQL(props.user, project);
	};
	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<div className={styles.button_row}>
					<Button
						type="submit"
						className={styles.save_draft}
						iconR={<i className="far fa-save"></i>}
						text="Save draft"
					/>
					<Button
						className={styles.delete_project}
						iconR={<i className="far fa-trash-alt"></i>}
						text="Delete project"
						onClick={() => {
							alert('Delete Project');
						}}
					/>
				</div>
			</div>
			<div
				id={project.pid}
				className={styles.project_title}
				onClick={(e) => {
					lockBg(e);
				}}
			>
				{project.title}
			</div>
			<div
				id={project.pid + '_popContent'}
				className={popup.popupContainer}
			>
				<ProjectDetails
					id={project.pid}
					project={project}
					editProjectDetails={editProjectDetails}
				/>
			</div>
			<div className={styles.title_help}>
				Click on the title to edit project details.
			</div>
			<div className={styles.section}>
				<Timeline
					label={label}
					percent={percent}
					width={props.dims.width * 0.7}
				/>
			</div>

			{step === 0 && (
				<div className={`${styles.parent_form} ${styles.project_bg1}`}>
					<div className={styles.heading}>Situation</div>
					<Situation
						situation={project.situation}
						nextStep={nextStep}
						editSituation={editSituation}
					/>
				</div>
			)}
			{step === 1 && (
				<div className={`${styles.parent_form} ${styles.project_bg2}`}>
					<div className={styles.heading}>Tasks & Actions</div>
					<TasksActions
						tasks={project.tasks}
						// projectDates={project.situation.projectDates}
						nextStep={nextStep}
						prevStep={prevStep}
						editTasks={editTasks}
					/>
				</div>
			)}
			{step === 2 && (
				<div className={`${styles.parent_form} ${styles.project_bg3}`}>
					<div className={styles.heading}>Results</div>
					<Results
						results={project.results}
						nextText="Preview Project"
						nextStep={nextStep}
						prevStep={prevStep}
						editResults={editResults}
						// addSection={addSection}
						// editSections={editSections}
					/>
				</div>
			)}
			{step === 3 && (
				<div>
					<div className={styles.heading}>Preview</div>
					<Preview
						project={project}
						prevStep={prevStep}
						editCover={editCover}
						finishProject={uploadToFirestore}
					/>
				</div>
			)}
		</div>
	);
}

const label = ['SITUATION', 'TASKS & ACTIONS', 'RESULTS', 'PREVIEW'];

// error checking after the whole form
const ProjectForm = withFormik({
	mapPropsToValues: () => ({ name: '' }),

	// Custom sync validation
	validate: (values) => {
		const errors = {};

		if (!values.name) {
			errors.name = 'Required';
		}

		return errors;
	},

	handleSubmit: (values, { setSubmitting }) => {
		console.log('submititng');
		setTimeout(() => {
			setSubmitting(false);
		}, 1000);
	},

	displayName: 'ProjectForm',
})(CreateProject);

export default connect(mapStateToProps)(withContext(ProjectForm));

const projectData = {
	status: 'Ongoing',
	visibility: 'Public',
	title: 'New project',
	cover: {
		changed: false,
		img: 'default',
		imgSrc:
			'https://firebasestorage.googleapis.com/v0/b/uran-28-12-98.appspot.com/o/static%2FdefaultProject.png?alt=media&token=dfa29922-f6da-47f1-9b01-a50a3ac15266',
	},
	situation: {
		summary:
			'Longer description ayyyyyyy, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse',
		role: 'team manager',
		teamSize: '1',
		budget: null,
		currency: '',
		projectDates: { startDate: null, endDate: null },
	},
	tasks: [
		{
			taskId: `task-${new Date().getTime()}`,
			title: 'New task',
			description:
				'Longer description ayyyyyyy, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse',
			startDate: null,
			endDate: null,
			actions: [
				{
					actionId: `action-${new Date().getTime()}`,
					title: 'New action',
					tools: [],
					skills: [],
					description:
						'Longer description ayyyyyyy, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse',
					files: [],
				},
			],
		},
	],
	results: {
		conclusion:
			'Longer description ayyyyyyy, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse',
		links: [
			{
				url: 'www.google.com',
				linkName: 'google',
			},
		],
		sections: [
			{
				sectionId: `section-${new Date().getTime()}`,
				description:
					'Longer description ayyyyyyy, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse',
				files: [],
				sectionLink: {
					url: 'www.google.com',
					linkName: 'google something',
				},
			},
		],
	},
};
