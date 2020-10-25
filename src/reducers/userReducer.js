
const userInfo = {
    loaded: false,
    uid: "",
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
    dateCreated: 0,
    status: "",
    photoUrl: "",
    occupation: "",
    description: "",
    location: "",
    socials: [],
    expertise: [],
};

export default (state = userInfo, action) => {
    switch (action.type) {
        case "UPDATE_USER_INFO":
            return {
                ...state,
                uid: action.userInfo.uid,
                firstName: action.userInfo.firstName,
                lastName: action.userInfo.lastName,
                email: action.userInfo.email,
                userType: action.userInfo.userType,
                dateCreated: action.userInfo.dateCreated,
                status: action.userInfo.status,
                photoUrl: action.userInfo.photo,
                introduction: action.userInfo.introduction,
                occupation: action.userInfo.occupation,
                description: action.userInfo.description,
                location: action.userInfo.location,
                logged: action.logged
            };
        case "UPDATE_SOCIALS":
            return {
                ...state,
                socials: action.userSocials,
            };
        case "UPDATE_EXPERTISE":
            return {
                ...state,
                expertise: action.userExpertise,
            };
        case "UPDATE_FROM_SIGNUP":
            return {
                ...state,
                uid: action.firstStep.uid,
                firstName: action.firstStep.firstName,
                lastName: action.firstStep.lastName,
                userType: action.firstStep.userType,
                photoUrl: action.photoURL,
                introduction: action.firstStep.introduction,
                occupation: action.firstStep.occupation,
                description: action.firstStep.description,
                location: action.firstStep.location,
                socials: action.thirdStep,
                logged: action.logged
            };
        case "LOGOUT_USER":
            return userInfo;
        default:
            return state;
    }
};
