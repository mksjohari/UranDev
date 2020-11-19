import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { NavLink, useHistory } from 'react-router-dom';
import SkillsTab from './skillsTab';
import TaskDnD from '../../shared/reactDnD/taskDnD';
import project from '../../modules/previewProject.module.scss';
import styles from '../../modules/createProject.module.scss';
import buttonStyle from '../../modules/_button.module.scss';
import header from '../../modules/header.module.scss';
import { getFirebase } from '../../shared/firebase/config';
import { connect } from 'react-redux';
import {
	getPidImage,
	addToStats,
	storage,
} from '../../shared/firebase/firebase';
// import { SectionGrid, SectionGridless } from "./previewProject";

const getProjectInfo = async (uid, pid, setData, setLoading, setDataLoaded) => {
	const ref = getFirebase()
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('projects')
		.doc(pid);
	const projectInfo = await ref.get();
	const projectData = projectInfo.data();
	const sections = [];
	projectData.results.sections.forEach((section) => {
		const files = [];
		section.files.forEach(async (file) => {
			const url = await storage
				.ref(`users/${uid}/projects/${pid}/results/${file.name}`)
				.getDownloadURL();
			files.push({ name: file.name, preview: url });
		});
		section.files = files;
		sections.push(section);
	});
	projectData.sections = sections;
	if (sections.length === projectData.results.sections.length) {
		setData(projectData);
		setLoading(false);
		setDataLoaded(true);
	}
};

export const getProjectTasks = async (
	uid,
	pid,
	setSkills,
	setTools,
	setTasks,
	fromEdit
) => {
	const tasks = [];
	const skills = [];
	const tools = [];
	const ref = getFirebase()
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('projects')
		.doc(pid);
	const projectTasks = await ref.collection('tasks').get();
	projectTasks.forEach((taskRaw) => {
		const actions = [];

		taskRaw.data().actions.forEach((action) => {
			const files = [];
			action.skills.forEach((skill) => {
				skills.push(skill);
			});
			action.tools.forEach((tool) => {
				tools.push(tool);
			});
			action.files.forEach(async (file) => {
				const imageObj = await getPidImage(uid, pid, file);
				files.push(imageObj);
			});
			actions.push({
				actionId: action.actionId,
				description: action.description,
				title: action.title,
				files: files,
				skills,
				tools,
			});
		});
		const task = {
			tid: taskRaw.data().tid,
			title: taskRaw.data().title,
			description: taskRaw.data().description,
			index: taskRaw.data().index,
			startDate: moment(new Date(taskRaw.data().startDate)),
			endDate: moment(new Date(taskRaw.data().endDate)),
			actions: actions,
		};
		tasks.push(task);
	});
	if (fromEdit === false) {
		setSkills(skills);
		setTools(tools);
	}
	setTasks(tasks);
};
const mapStateToProps = (state) => {
	return { user: state.user };
};

const editProject = async (project, tasks, history) => {
	const oldSkills = {};
	const oldTools = {};
	tasks.map(async (task, index) => {
		task.actions.forEach((action) => {
			action.skills.forEach((skill) => {
				addToStats(oldSkills, skill);
			});
			action.tools.forEach((tool) => {
				addToStats(oldTools, tool);
			});
		});
	});
	project.oldSkills = oldSkills;
	project.oldTools = oldTools;
	history.push('/edit', { projectData: project });
};

function ProjectPage(props) {
	const uid = props.match.params.uid;
	const pid = props.match.params.pid;
	const [isMe, setIsMe] = useState();
	const [data, setData] = useState();
	const [dataLoaded, setDataLoaded] = useState(false);
	const [loading, setLoading] = useState(true);
	const [skills, setSkills] = useState([]);
	const [tools, setTools] = useState([]);
	const [tasks, setTasks] = useState();
	const [overview, setOverview] = useState(true);
	const [user, setUser] = useState();
	const history = useHistory();
	useEffect(() => {
		setUser(props.user);
		if (!dataLoaded) {
			getProjectInfo(uid, pid, setData, setLoading, setDataLoaded);
		} else {
			if (data !== null) {
				getProjectTasks(uid, pid, setSkills, setTools, setTasks, false);
			}
		}
		props.user.uid === uid ? setIsMe(true) : setIsMe(false);
	}, [uid, pid, data, dataLoaded, props.user]);
	if (loading === true || dataLoaded === false) {
		return <div>Loading</div>;
	}
	return (
		<div>
			<div className={project.cover_div}>
				{isMe && (
					<label
						className={`${buttonStyle.cover_btn} ${buttonStyle.button} ${project.cover_button}`}
						onClick={() => {
							editProject(data, tasks, history);
						}}
					>
						<i className="fas fa-edit" style={{ marginRight: 5 }} />
						Edit Project
					</label>
				)}
				<img
					className={project.cover_img}
					src={data.coverUrl}
					alt="cover"
				/>
				<div className={project.banner}>
					<div className={project.project_title}>{data.title}</div>
					<div className={project.details}>
						<i
							className="far fa-calendar"
							style={{ margin: '10px' }}
						/>
						{`${dateToDMY(
							data.situation.startDate.toDate()
						)} - ${dateToDMY(data.situation.endDate.toDate())}`}
					</div>
				</div>
			</div>
			<div className={`${header.tabBottom}`}>
				<NavLink
					activeClassName={header.activeProjectTab}
					to="#"
					isActive={() => overview}
					className={header.projectTab}
					onClick={() => setOverview(true)}
				>
					Situation & Results
				</NavLink>

				<NavLink
					activeClassName={header.activeProjectTab}
					to="#"
					isActive={() => !overview}
					className={header.projectTab}
					onClick={() => setOverview(false)}
				>
					Tasks & Actions
				</NavLink>
			</div>
			<SkillsTab skills={skills} tools={tools} />
			{overview ? (
				<div className={project.project_ctn}>
					<div className={project.project_section}>
						<h1 className={project.h1}>Situation</h1>
						<div className={project.situation_grid}>
							<div className={project.summary_div}>
								{data.situation.summary}
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
										{data.situation.teamSize}
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
										{data.situation.budget
											? `${data.situation.budget} ${data.situation.currency.value}`
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
												data.situation.endDate -
													data.situation.startDate
											)
											.humanize({ d: 7, w: 4 })}
									</div>
								</div>
							</div>

							<div className={project.user_div}>
								<img
									src={user.photoUrl}
									alt="user"
									className={project.profile_pic}
								/>
								<div className={project.name}>
									{`${user.firstName} ${user.lastName}`}
								</div>
								<div className={project.details}>
									{data.situation.role}
								</div>
							</div>
						</div>
					</div>
					<div className={project.project_section}>
						<h1 className={project.h1}>Results</h1>
						<div className={project.conclusion_grid}>
							<div className={project.results_links}>
								{data.results.links.length
									? data.results.links.map((link, index) => (
											<a
												className={`${styles.section_link}`}
												href={link.url}
												key={index}
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
								{data.results.conclusion}
							</div>
						</div>
						{data.results.sections.length
							? data.results.sections.map((section, index) => (
									<div
										key={index}
										className={`${project.top_margin}`}
									></div>
							  ))
							: ''}
					</div>
				</div>
			) : (
				<div className={project.project_ctn}>
					<div className={project.project_section}>
						<h1 className={project.h1}>Tasks & Actions</h1>
						<TaskDnD data={tasks} readOnly />
					</div>
				</div>
			)}
		</div>
	);
}

export default connect(mapStateToProps)(ProjectPage);

export function dateToDMY(date) {
	return `${date.getDate()}/${
		date.getUTCMonth() + 1
	}/${date.getUTCFullYear()}`;
}
