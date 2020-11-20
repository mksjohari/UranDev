import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';
import moment from 'moment';
import { getFirebase, getFunctions, getStorage } from './config';
// FUNCTIONS //

export const createAccount = getFunctions(firebase).httpsCallable(
	'createAccount'
);

export const checkUserExists = getFunctions(firebase).httpsCallable(
	'checkUserExists'
);

export const getUserInfo = getFunctions(firebase).httpsCallable('getUserInfo');
export const getPublicInfo = getFunctions(firebase).httpsCallable(
	'getPublicInfo'
);
export const getUserSocials = getFunctions(firebase).httpsCallable(
	'getUserSocials'
);
export const getUserExpertise = getFunctions(firebase).httpsCallable(
	'getUserExpertise'
);

export const finishUserSignUp = getFunctions(firebase).httpsCallable(
	'finishUserSignUp'
);

export const getExploreUsers = getFunctions(firebase).httpsCallable(
	'getExploreUsers'
);
export const getExploreCount = getFunctions(firebase).httpsCallable(
	'getExploreCount'
);
export const updateUserStats = getFunctions(firebase).httpsCallable(
	'updateUserStats'
);
export const addSkillsAndTools = getFunctions(firebase).httpsCallable(
	'addSkillsAndTools'
);
export const updateAccountSettings = getFunctions(firebase).httpsCallable(
	'updateAccountSettings'
);
export const getUID = getFunctions(firebase).httpsCallable('getUID');
export const tempDeleteProjectStats = getFunctions(firebase).httpsCallable(
	'tempDeleteProjectStats'
);

// FIRESTORE

export const addUserDetails = async (
	uid,
	photoURL,
	allExpertise,
	firstStep,
	secondStep,
	thirdStep
) => {
	await getFirebase().firestore().collection('/users').doc(uid).set({
		uid: uid,
		firstName: firstStep.firstName,
		lastName: firstStep.lastName,
		role: firstStep.role,
		photoUrl: photoURL,
		occupation: secondStep.occupation,
		location: secondStep.location,
		description: secondStep.description,
		expertise: allExpertise,
		socials: thirdStep,
		skills: {},
		tools: {},
	});
};

export const uploadProject = async (uid, project, addSkillsTools) => {
	const ref = getFirebase()
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('projects')
		.doc(project.pid);
	const newSkills = {};
	const newTools = {};
	const projectBase = {
		pid: project.pid,
		title: project.title,
		visibility: project.visibility,
		situation: {
			summary: project.situation.summary,
			role: project.situation.role,
			teamSize: project.situation.teamSize,
			currency: project.situation.currency,
			budget: project.situation.budget,
			projectDates: {
				startDate: new Date(
					project.situation.projectDates.startDate.format()
				),
				endDate: new Date(project.situation.projectDates.endDate.format()),
			}
		},
		created: new Date(),
	};
	await ref
		.set(projectBase)
		.then(() => {
			project.tasks.map(async (task, index) => {
				const actions = [];
				task.actions.forEach((action) => {
					const files = [];
					action.skills.forEach((skill) => {
						addToStats(newSkills, skill);
					});
					action.tools.forEach((tool) => {
						addToStats(newTools, tool);
					});
					action.files.forEach((file) => {
						files.push(file.name);
					});
					action.files.forEach(async (file) => {
						const path = storage.ref(
							`users/${uid}/projects/${project.pid}/${file.name}`
						);
						await path.put(file);
					});
					actions.push({
						actionId: action.actionId,
						title: action.title,
						description: action.description,
						skills: action.skills,
						tools: action.tools,
						files: files,
					});
				});
				var startDate = null;
				var endDate = null;
				if (
					typeof task.startDate === moment &&
					typeof task.endDate === moment
				) {
					startDate = new Date(task.startDate.format());
					endDate = new Date(task.endDate.format());
				}
				var taskId;
				if (task.tid) {
					taskId = task.tid;
				} else {
					taskId = `task-${Math.floor(
						Math.random() * 100000
					)}-${Math.floor(Math.random() * 100000)}-${Math.floor(
						Math.random() * 100000
					)}-${Math.floor(Math.random() * 100000)}`;
				}
				await ref.collection('tasks').doc(taskId).set({
					index,
					actions: actions,
					description: task.description,
					title: task.title,
					startDate: startDate,
					endDate: endDate,
					tid: taskId,
				});
			});
		})
		.then(async () => {
			const sections = [];
			const results = {
				conclusion: project.results.conclusion,
				links: project.results.links,
			};
			project.results.sections.forEach((section) => {
				console.log(section);
				const files = [];
				section.files.forEach(async (file) => {
					const path = storage.ref(
						`users/${uid}/projects/${project.pid}/results/${file.name}`
					);
					path.put(file);
					files.push({ name: file.name });
				});
				sections.push({
					sectionId: section.sectionId,
					description: section.description,
					files: files,
					sectionLink: section.sectionLink,
				});
			});
			results.sections = sections;
			var url =
				'https://firebasestorage.googleapis.com/v0/b/uran-28-12-98.appspot.com/o/static%2FdefaultProject.png?alt=media&token=dfa29922-f6da-47f1-9b01-a50a3ac15266';
			if (project.cover.changed === true) {
				const path = storage.ref(
					`users/${uid}/projects/${project.pid}/cover`
				);
				await path.put(project.cover.imgSrc);
				url = await storage
					.ref(`users/${uid}/projects/${project.pid}/cover`)
					.getDownloadURL();
			}
			if (project.fromEdit === true) {
				await tempDeleteProjectStats({
					oldSkills: project.oldSkills,
					oldTools: project.oldTools,
					uid,
				});
			}
			const projectPreview = {
				pid: project.pid,
				title: project.title,
				role: project.situation.role,
				visibility: project.visibility,
				coverUrl: url,
				startDate: new Date(
					project.situation.projectDates.startDate.format()
				),
				endDate: new Date(
					project.situation.projectDates.endDate.format()
				),
				skills: Object.keys(newSkills),
				tools: Object.keys(newTools),
			};
			console.log(uid, project.pid, results);
			await ref.update({ results: results });
			await getFirebase()
				.firestore()
				.collection('users')
				.doc(uid)
				.collection('projectPreviews')
				.doc(project.pid)
				.set(projectPreview);
			await ref.update({ coverUrl: url });
			project.results.sections.forEach((section) => {
				section.files.forEach(async (file) => {
					const path = storage.ref(
						`users/${uid}/projects/${project.pid}/${file.name}`
					);
					await path.put(file);
				});
			});
			await updateUserStats({ uid, skills: newSkills, tools: newTools });
			if (project.fromEdit === false) {
				addSkillsTools(newSkills, newTools);
			}
		});
};

// STORAGE //
export const storage = getStorage(firebase);

export const getPidImage = async (uid, pid, name) => {
	const ref = storage.ref(`users/${uid}/projects/${pid}/${name}`);
	const preview = await ref.getDownloadURL();
	return { name, preview };
};
// HELPER FUNCTIONS //

export const addToStats = (stats, key) => {
	if (key in stats) {
		stats[key] += 1;
	} else {
		stats[key] = 1;
	}
};
