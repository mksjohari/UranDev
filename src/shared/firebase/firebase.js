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

export const uploadProject = async (uuid, project) => {
	const projectBase = {
		pid: project.projectId,
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
	await getFirebase()
		.firestore()
		.collection('users')
		.doc(uuid)
		.collection('projects')
		.doc(project.projectId)
		.set(projectBase);
};

// STORAGE //
export const storage = getStorage(firebase);
