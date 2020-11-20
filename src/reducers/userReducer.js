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
	skills: [],
	tools: [],
	endorseSkills: [],
	endorseTools: [],
};

export default (state = notLoggedUserInfo, action) => {
	switch (action.type) {
		case 'UPDATE_USER_INFO':
			return {
				...state,
				uuid: action.uuid,
				uid: action.uid,
				firstName: action.userInfo.firstName,
				lastName: action.userInfo.lastName,
				email: action.exists.email,
				status: action.exists.status,
				userType: action.userInfo.role,
				photoUrl: action.userInfo.photoUrl,
				occupation: action.userInfo.occupation,
				description: action.userInfo.description,
				location: action.userInfo.location,
				socials: action.userInfo.socials,
				expertise: action.userInfo.expertise,
				skills: action.userInfo.skills,
				tools: action.userInfo.tools,
				endorseSkills: action.userInfo.endorseSkills,
				endorseTools: action.userInfo.endorseTools,
				logged: action.logged,
			};

		case 'UPDATE_FROM_COMPLETE_SIGNUP':
			return {
				...state,
				uuid: action.uuid,
				uid: action.uid,
				firstName: action.firstStep.firstName,
				lastName: action.firstStep.lastName,
				userType: action.firstStep.userType,
				photoUrl: action.photoURL,
				occupation: action.secondStep.occupation,
				description: action.secondStep.description,
				location: action.secondStep.location,
				socials: action.thirdStep,
				expertise: action.allExpertise,
				logged: action.logged,
				skills: {},
				tools: {},
				endorseSkills: {},
				endorseTools: {},
				status: action.status,
			};
		case 'UPDATE_FROM_SIGNUP':
			return {
				...state,
				uuid: action.uuid,
				firstName: action.firstName,
				lastName: action.lastName,
				email: action.email,
				logged: action.logged,
			};
		case 'UPDATE_USER_INFO_SETTING':
			return {
				...state,
				firstName: action.userInfo.firstName,
				lastName: action.userInfo.lastName,
				email: action.userInfo.email,
				occupation: action.userInfo.occupation,
				location: action.userInfo.location,
				photoUrl: action.userInfo.photoUrl,
				expertise: action.userInfo.expertise,
				description: action.userInfo.description,
				socials: action.userInfo.socials,
			};
		// Adds new project skills and tools to state after creating a new project
		case 'ADD_SKILLS_TOOLS':
			const userStats = state;
			const skills = action.newSkills;
			const tools = action.newTools;
			const newSkills = userStats.skills;
			const newTools = userStats.tools;
			for (const [key, value] of Object.entries(skills)) {
				if (key in newSkills) {
					newSkills[key] = newSkills[key] + value;
				} else {
					newSkills[key] = value;
				}
			}
			for (const [key, value] of Object.entries(tools)) {
				if (key in newTools) {
					newTools[key] = newSkills[key] + value;
				} else {
					newTools[key] = value;
				}
			}

			return {
				...state,
				skills: newSkills,
				tools: newTools,
			};
		case 'LOGOUT_USER':
			return notLoggedUserInfo;
		default:
			return state;
	}
};
