export const notLoggedUserInfo = {
    logged: false,
    uuid: "",
    uid: "",
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
    status: "",
    photoUrl: "",
    occupation: "",
    description: "",
    location: "",
    socials: [],
    expertise: [],
};

export default (state = notLoggedUserInfo, action) => {
    switch (action.type) {
        case "UPDATE_USER_INFO":
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
                logged: action.logged,
            };

        case "UPDATE_FROM_COMPLETE_SIGNUP":
            // need to add  email
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
                status: action.status,
            };
        case "UPDATE_FROM_SIGNUP":
            return {
                ...state,
                uuid: action.uuid,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                logged: action.logged,
            };
        case "LOGOUT_USER":
            return notLoggedUserInfo;
        default:
            return state;
    }
};
