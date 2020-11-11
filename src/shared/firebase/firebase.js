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

// FIRESTORE

export const getProject = async (uid, pid) => {};

export const uploadProject = async (uid, project) => {
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
		},
	};
	const projectPreview = {
		pid: project.pid,
		title: project.title,
		role: project.situation.role,
		startDate: new Date(project.situation.projectDates.startDate.format()),
		endDate: new Date(project.situation.projectDates.endDate.format()),
		skills: [],
		tools: [],
	};
	await getFirebase()
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('projects')
		.doc(project.pid)
		.set(projectBase);
	await getFirebase()
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('projectPreviews')
		.doc(project.pid)
		.set(projectPreview);
};

// STORAGE //
export const storage = getStorage(firebase);
