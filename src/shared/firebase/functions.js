import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import { getFunctions } from '../../shared/firebase/firebase';

export const checkUserExists = getFunctions(firebase).httpsCallable(
	'checkUserExists'
);
export const createAccount = getFunctions(firebase).httpsCallable(
	'createAccount'
);
