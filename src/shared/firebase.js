const firebaseConfig = {
    apiKey: "AIzaSyCb3O3mwrZnycpDs8sv7XJKbPE0gvRsqD4",
    authDomain: "uran-28-12-98.firebaseapp.com",
    databaseURL: "https://uran-28-12-98.firebaseio.com",
    projectId: "uran-28-12-98",
    storageBucket: "uran-28-12-98.appspot.com",
    messagingSenderId: "113317665845",
    appId: "1:113317665845:web:9b4e3065a9a84b7cd5a57c",
    measurementId: "G-DDKX9CHS1L",
};

let firebaseInstance;
let functionsInstance;
export const getFirebase = (firebase) => {
    if (firebaseInstance) {
        return firebaseInstance;
    }

    firebase.initializeApp(firebaseConfig);
    firebaseInstance = firebase;

    return firebase;
};
export const getFunctions = (firebase) => {
    if (functionsInstance) {
        return functionsInstance;
    }
    if (firebaseInstance) {
        functionsInstance = firebase.app().functions("localhost:5001");
        return functionsInstance;
    } else {
        firebase.initializeApp(firebaseConfig);
        firebaseInstance = firebase;
        functionsInstance = firebase.app().functions("localhost:5001");
        return functionsInstance;
    }
};
