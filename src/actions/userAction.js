export const updateInfo = (uuid, uid, exists, userInfo) => (dispatch) => {
    dispatch({
        type: "UPDATE_USER_INFO",
        uuid: uuid,
        uid: uid,
        exists: exists,
        userInfo: userInfo,
        logged: true,
    });
};
export const addSkillsTools = (newSkills, newTools) => (dispatch) => {
    dispatch({
        type: "ADD_SKILLS_TOOLS",
        newSkills: newSkills,
        newTools: newTools,
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
        type: "UPDATE_FROM_COMPLETE_SIGNUP",
        uuid,
        uid,
        allExpertise,
        photoURL,
        firstStep,
        secondStep,
        thirdStep,
        status: "unverified",
        logged: true,
    });
};

export const updateInfoFromSignUp = (data) => (dispatch) => {
    dispatch({
        type: "UPDATE_FROM_SIGNUP",
        uuid: data.uuid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        status: data.status,
        logged: true,
    });
};

export const logoutUser = () => (dispatch) => {
    dispatch({
        type: "LOGOUT_USER",
    });
};
