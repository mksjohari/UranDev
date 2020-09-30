import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import { getFunctions } from '../../shared/firebase/firebase';

export const getUserInfo = getFunctions(firebase).httpsCallable('getUser');
export const createAccount = getFunctions(firebase).httpsCallable(
	'createAccount'
);
