export const updateInfo = (results) => (dispatch) => {
    dispatch({
        type: "UPDATE_USER_INFO",
        userInfo: results.userInfo,
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
