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

async function addSkillsTools(user, project) {
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
	function nextStep() {
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
	function addSection(values) {
		const newSections = [...project.results.sections, values];
		const newProject = { ...project };
		newProject.results.sections = newSections;
		setProject(newProject);
	}
	function editProjectDetails(values) {
		const newProject = { ...project };
		newProject.status = values.status;
		newProject.sharing = values.sharing;
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
	function editSections(index, values) {
		const newSections = [...project.results.sections];
		newSections[index].description = values.description;
		newSections[index].sectionLink = values.sectionLink;
		newSections[index].files = values.files;
		const newProject = { ...project };
		newProject.results.sections[index] = newSections;
		setProject(newProject);
	}
	const uploadToFirestore = async () => {
		console.log(project);
		uploadProject(props.user.uid, project);
		history.push(`users/${props.user.uid}`);
		addSkillsTools(props.user, project);
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
				<div className={styles.parent_form}>
					<div className={styles.heading}>Situation</div>
					<Situation
						situation={project.situation}
						nextStep={nextStep}
						editSituation={editSituation}
					/>
				</div>
			)}
			{step === 1 && (
				<div className={styles.parent_form}>
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
				<div className={styles.parent_form}>
					<div className={styles.heading}>Results</div>
					<Results
						results={project.results}
						nextStep={nextStep}
						prevStep={prevStep}
						editResults={editResults}
						addSection={addSection}
						editSections={editSections}
						finishProject={uploadToFirestore}
					/>
				</div>
			)}
			{step === 3 && <Preview project={project} />}
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
	sharing: 'Public',
	title: 'New project',
	situation: {
		summary: '',
		role: '',
		teamSize: '1',
		budget: 0,
		currency: 'AUD',
		projectDates: { startDate: null, endDate: null },
	},
	tasks: [
		{
			taskId: `task-${new Date().getTime()}`,
			title: 'New task',
			description: '',
			startDate: null,
			endDate: null,
			actions: [
				// {
				//     actionId: `action-${new Date().getTime()}`,
				//     title: "New action",
				//     tools: [],
				//     skills: [],
				//     description: "",
				//     files: [],
				// },
			],
		},
	],
	results: {
		conclusion: '',
		links: [
			// {
			//     url: "",
			//     linkName: "",
			// },
		],
		sections: [
			// {
			//     sectionId: `section-${new Date().getTime()}`,
			//     description:
			//         "Longer description ayyyyyyy, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse",
			//     files: [],
			//     sectionLink: {
			//         url: "",
			//         linkName: "",
			//     },
			// },
		],
	},
};
