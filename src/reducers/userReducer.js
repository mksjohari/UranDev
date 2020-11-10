export const notLoggedUserInfo = {
	logged: false,
	uuid: '',
	uid: '',
	firstName: '',
	lastName: '',
	email: '',
	userType: '',
	status: '',
	photoUrl: '',
	occupation: '',
	description: '',
	location: '',
	socials: [],
	expertise: [],
};

export default (state = notLoggedUserInfo, action) => {
	switch (action.type) {
		case 'UPDATE_USER_INFO':
			return {
				...state,
				uuid: action.userInfo.uuid,
				uid: action.userInfo.uid,
				firstName: action.userInfo.firstName,
				lastName: action.userInfo.lastName,
				email: action.userInfo.email,
				userType: action.userInfo.userType,
				status: action.userInfo.status,
				photoUrl: action.userInfo.photo,
				introduction: action.userInfo.introduction,
				occupation: action.userInfo.occupation,
				description: action.userInfo.description,
				location: action.userInfo.location,
				logged: action.logged,
			};
		case 'UPDATE_SOCIALS':
			return {
				...state,
				socials: action.userSocials,
			};
		case 'UPDATE_EXPERTISE':
			return {
				...state,
				expertise: action.userExpertise,
			};
		case 'UPDATE_FROM_COMPLETE_SIGNUP':
			// need to add  email
			return {
				...state,
				uuid: action.uuid,
				firstName: action.firstStep.firstName,
				lastName: action.firstStep.lastName,
				userType: action.firstStep.userType,
				photoUrl: action.photoURL,
				introduction: action.firstStep.introduction,
				occupation: action.firstStep.occupation,
				description: action.firstStep.description,
				location: action.firstStep.location,
				socials: action.thirdStep,
				logged: action.logged,
				status: action.status,
			};
		case 'UPDATE_FROM_SIGNUP':
			return {
				...state,
				uuid: action.uuid,
				firstName: action.firstName,
				lastName: action.lastName,
				logged: action.logged,
			};
		case 'LOGOUT_USER':
			return notLoggedUserInfo;
		default:
			return state;
	}
};
