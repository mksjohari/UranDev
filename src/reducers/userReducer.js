const userState = {
	success: null,
	firstName: null,
	lastName: null,
};

export default (state = userState, action) => {
	switch (action.type) {
		case 'UPDATE_INFO':
			return {
				...state,
				uid: action.uid,
				firstName: action.firstName,
				lastName: action.uid,
			};
		default:
			return state;
	}
};
