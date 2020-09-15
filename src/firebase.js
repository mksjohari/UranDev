var firebaseConfig = {
    apiKey: "AIzaSyDWR43_opKm7pi74MHW5mvLwxZrn9nZRpU",
    authDomain: "uran-281298.firebaseapp.com",
    databaseURL: "https://uran-281298.firebaseio.com",
    projectId: "uran-281298",
    storageBucket: "uran-281298.appspot.com",
    messagingSenderId: "492941185996",
    appId: "1:492941185996:web:ca33119829b46b98a40369",
};

let firebaseInstance;
export const getFirebase = (firebase) => {
    if (firebaseInstance) {
        return firebaseInstance;
    }

    firebase.initializeApp(firebaseConfig);
    firebaseInstance = firebase;

    return firebase;
};
