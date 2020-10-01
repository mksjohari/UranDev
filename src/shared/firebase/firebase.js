import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import { getFunctions, getStorage } from "./config";

// FUNCTIONS //

export const checkUserExists = getFunctions(firebase).httpsCallable(
    "checkUserExists"
);
export const createAccount = getFunctions(firebase).httpsCallable(
    "createAccount"
);

// STORAGE //
export const storage = getStorage(firebase);
