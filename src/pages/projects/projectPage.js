import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { NavLink, useHistory } from 'react-router-dom';
import SkillsTab from './skillsTab';
import { getFirebase } from '../../shared/firebase/config';
import { connect } from 'react-redux';
import {
	getPidImage,
	addToStats,
	storage,
} from '../../shared/firebase/firebase';
import { getDetails } from '../user/user';

import Button from '../../shared/sandbox/Button';
import { lockBg } from '../../shared/sandbox/Popup';
import EndorseList from '../../shared/input/EndorseList';
import ReadonlyDnD from '../../shared/reactDnD/readonlyDnD';
import { SectionGrid, SectionGridless } from './previewProject.js';

import project from '../../modules/previewProject.module.scss';
import styles from '../../modules/createProject.module.scss';
import buttonStyle from '../../modules/_button.module.scss';
import popup from '../../modules/popup.module.scss';
import header from '../../modules/header.module.scss';
import EndorseCard from './endorseCard';

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
	projectData.situation.projectDates.startDate = new Date(
		projectData.situation.projectDates.startDate.toDate()
	);
	projectData.situation.projectDates.endDate = new Date(
		projectData.situation.projectDates.endDate.toDate()
	);

	const sections = [];
	projectData.results.sections.forEach((section) => {
		const files = [];
		section.files.forEach(async (file) => {
			const url = await storage
				.ref(`users/${uid}/projects/${pid}/results/${file.name}`)
				.getDownloadURL();
			files.push({ name: file.name, type: file.type, preview: url });
		});
		section.files = files;
		sections.push(section);
	});
	projectData.results.sections = sections;
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

const getEndorsers = async (uid, pid, setEndorsers) => {
	const endorsers = [];
	const endorsersRaw = await getFirebase()
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('projects')
		.doc(pid)
		.collection('endorsements')
		.get();
	endorsersRaw.forEach((doc) => {
		endorsers.push(doc.data());
	});
	setEndorsers(endorsers);
};

function CheckEndorseExists(user, endorsers) {
	for (let i = 0; i < endorsers.length; i++) {
		if (endorsers[i].uid === user.uid) {
			return true;
		}
	}
	return false;
}

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
	const [checked, setChecked] = useState(false);
	const [endorsements, setEndorsements] = useState([]);
	const history = useHistory();
	useEffect(() => {
		if (props.location.state && props.location.state.user) {
			setUser(props.location.state.user);
			setChecked(true);
		} else {
			getDetails(uid, setUser, setChecked);
		}
		if (!dataLoaded) {
			getEndorsers(uid, pid, setEndorsements);
			getProjectInfo(uid, pid, setData, setLoading, setDataLoaded);
		} else {
			if (data !== null) {
				getProjectTasks(uid, pid, setSkills, setTools, setTasks, false);
			}
		}
		props.user.uid === uid ? setIsMe(true) : setIsMe(false);
	}, [uid, pid, data, dataLoaded, props]);
	if (checked === false || loading === true || dataLoaded === false) {
		return <div>Loading {console.log(checked, loading, dataLoaded)}</div>;
	}
	const editEndorsements = (values) => {
		setEndorsements([...endorsements, values]);
	};
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
							data.situation.projectDates.startDate
						)} - ${dateToDMY(data.situation.projectDates.endDate)}`}
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
												moment(
													data.situation.projectDates
														.endDate
												).diff(
													moment(
														data.situation
															.projectDates
															.startDate
													)
												)
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
						{data.results.sections.length > 0 &&
							data.results.sections.map((section, index) => {
								if (section.files.length > 0) {
									if (
										section.files[0].type === 'image/jpeg'
									) {
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
						<ReadonlyDnD data={tasks} />
					</div>
				</div>
			)}
			<div className={project.project_ctn}>
				<div className={project.section_footer}>
					<div className={styles.endorsements}>
						<h1
							className={project.h1}
							style={{ marginRight: '10px' }}
						>
							Endorsements
						</h1>
						<Button
							id={data.pid}
							className={`yellow`}
							style={{ marginTop: '4px' }}
							iconR={<i className="fas fa-check"></i>}
							text="Endorse Project"
							onClick={(e) => {
								if (
									CheckEndorseExists(props.user, endorsements)
								) {
									alert('already Endorsed this project');
								} else if (uid === props.user.uid) {
									alert('Cant endorse your own project');
								} else if (props.user.logged === false) {
									alert('You must be signed in to endorse');
								} else {
									lockBg(e);
								}
							}}
						/>
					</div>
					<div
						className={popup.popupContainer}
						id={data.pid + '_popContent'}
					>
						<EndorseList
							id={data.pid}
							skills={skills}
							tools={tools}
							editEndorsements={editEndorsements}
							data={data}
							projectUser={uid}
						/>
					</div>
				</div>
				{endorsements.map((endorsement, index) => (
					<EndorseCard key={index} user={endorsement} />
				))}
			</div>
		</div>
	);
}

export default connect(mapStateToProps)(ProjectPage);

export function dateToDMY(date) {
	return `${date.getDate()}/${
		date.getUTCMonth() + 1
	}/${date.getUTCFullYear()}`;
}
