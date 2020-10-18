
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
        default:
            return state;
    }
};
