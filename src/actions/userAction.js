export const updateInfo = (results) => (dispatch) => {
    console.log("RESULTS", results)
    dispatch({
        type: "UPDATE_USER_INFO",
		userInfo: results.userInfo,
		logged: true
    });
    dispatch({
        type: "UPDATE_SOCIALS",
        userSocials: results.userSocials,
    });
    dispatch({
        type: "UPDATE_EXPERTISE",
        userExpertise: results.userExpertise,
    });
};

export const updateInfoFromSignUp = (photoURL,firstStep, secondStep, thirdStep) => (dispatch) => {
    dispatch({
        type: "UPDATE_FROM_SIGNUP",
        photoURL,
        firstStep,
        secondStep,
        thirdStep,
		logged: true
    });
};

export const logoutUser = () => (dispatch) => {
        dispatch({
        type: "LOGOUT_USER",
    });
}