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

// FIRESTORE

export const uploadProject = async (uuid, project) => {
	await getFirebase()
		.firestore()
		.collection('users')
		.doc(uuid)
		.collection('projects')
		.doc(project.projectId)
		.set(project);
};

// STORAGE //
export const storage = getStorage(firebase);
