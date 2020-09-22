import firebase from 'firebase/app';
import 'firebase/auth';
import { getFirebase } from '../shared/firebase';

export const updateUser = (results) => (dispatch) => {
	var lastName;
	if (results.additionalUserInfo.profile.family_name) {
		lastName = results.additionalUserInfo.profile.family_name;
	} else {
		lastName = '';
	}
	console.log(results);

	const initial = {
		email: results.additionalUserInfo.profile.email,
		firstName: results.additionalUserInfo.profile.given_name,
		lastName: lastName,
		photoUrl: results.additionalUserInfo.profile.picture,
	};
	console.log(initial);
};
