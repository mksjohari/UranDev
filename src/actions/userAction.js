export const updateInfo = (uuid, uid, userInfo) => (dispatch) => {
	dispatch({
		type: 'UPDATE_USER_INFO',
		uuid: uuid,
		uid: uid,
		userInfo: userInfo,
		logged: true,
	});
};

export const updateInfoFromCompleteSignUp = (
	uuid,
	uid,
	photoURL,
	allExpertise,
	firstStep,
	secondStep,
	thirdStep
) => (dispatch) => {
	dispatch({
		type: 'UPDATE_FROM_COMPLETE_SIGNUP',
		uuid,
		uid,
		allExpertise,
		photoURL,
		firstStep,
		secondStep,
		thirdStep,
		status: 'unverified',
		logged: true,
	});
};

export const updateInfoFromSignUp = (data) => (dispatch) => {
	dispatch({
		type: 'UPDATE_FROM_SIGNUP',
		uuid: data.uuid,
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		logged: true,
	});
};

export const logoutUser = () => (dispatch) => {
	dispatch({
		type: 'LOGOUT_USER',
	});
};
