import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import { getFunctions, getStorage } from "./config";

// FUNCTIONS //

export const createAccount = getFunctions(firebase).httpsCallable(
    "createAccount"
);

export const checkUserExists = getFunctions(firebase).httpsCallable(
    "checkUserExists"
);

export const getUserInfo = getFunctions(firebase).httpsCallable(
    "getUserInfo"
);
export const getUserSocials = getFunctions(firebase).httpsCallable(
    "getUserSocials"
);
export const getUserExpertise = getFunctions(firebase).httpsCallable(
    "getUserExpertise"
);

export const finishUserSignUp = getFunctions(firebase).httpsCallable(
    "finishUserSignUp"
);

// STORAGE //
export const storage = getStorage(firebase);
