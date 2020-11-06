import { database } from "firebase";

export const updateInfo = (results) => (dispatch) => {
    console.log("RESULTS", results);
    dispatch({
        type: "UPDATE_USER_INFO",
        userInfo: results.userInfo,
        logged: true,
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

export const updateInfoFromCompleteSignUp = (
    uuid,
    photoURL,
    email,
    firstStep,
    secondStep,
    thirdStep
) => (dispatch) => {
    dispatch({
        type: "UPDATE_FROM_COMPLETE_SIGNUP",
        uuid,
        photoURL,
        email,
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
        logged: true,
    });
};

export const logoutUser = () => (dispatch) => {
    dispatch({
        type: "LOGOUT_USER",
    });
};
