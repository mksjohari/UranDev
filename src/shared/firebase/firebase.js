import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';
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
export const getUID = getFunctions(firebase).httpsCallable('getUID');

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
		firstName: firstStep.firstName,
		lastName: firstStep.lastName,
		role: firstStep.role,
		photoUrl: photoURL,
		occupation: secondStep.occupation,
		location: secondStep.location,
		personalDesc: secondStep.personalDesc,
		expertise: allExpertise,
		socials: thirdStep,
		skills: {},
		tools: {},
	});
};

export const getProject = async (uid, pid) => {};

export const uploadProject = async (uid, project) => {
	const newSkills = {};
	const newTools = {};
	const projectBase = {
		pid: project.pid,
		title: project.title,
		visibility: project.sharing,
		situation: {
			summary: project.situation.summary,
			role: project.situation.role,
			teamSize: project.situation.teamSize,
			currency: project.situation.currency,
			budget: project.situation.budget,
			startDate: new Date(
				project.situation.projectDates.startDate.format()
			),
			endDate: new Date(project.situation.projectDates.endDate.format()),
		},
		results: {
			conclusion: project.results.conclusion,
			links: project.results.links,
			sections: project.results.sections,
		},
		created: new Date(),
	};

	await getFirebase()
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('projects')
		.doc(project.pid)
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
					console.log(files);
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
				if (task.startDate !== null && task.endDate !== null) {
					startDate = new Date(task.startDate.format());
					endDate = new Date(task.endDate.format());
				}
				await getFirebase()
					.firestore()
					.collection('users')
					.doc(uid)
					.collection('projects')
					.doc(project.pid)
					.collection('tasks')
					.add({
						index,
						actions: actions,
						description: task.description,
						title: task.title,
						startDate: startDate,
						endDate: endDate,
					});
			});
		})
		.then(async () => {
			const projectPreview = {
				pid: project.pid,
				title: project.title,
				role: project.situation.role,
				startDate: new Date(
					project.situation.projectDates.startDate.format()
				),
				endDate: new Date(
					project.situation.projectDates.endDate.format()
				),
				skills: newSkills,
				tools: newTools,
			};
			await getFirebase()
				.firestore()
				.collection('users')
				.doc(uid)
				.collection('projectPreviews')
				.doc(project.pid)
				.set(projectPreview);
			await updateUserStats({ uid, skills: newSkills, tools: newTools });
		});
};

// STORAGE //
export const storage = getStorage(firebase);

// HELPER FUNCTIONS //

const addToStats = (stats, key) => {
	if (key in stats) {
		stats[key] += 1;
	} else {
		stats[key] = 1;
	}
};
