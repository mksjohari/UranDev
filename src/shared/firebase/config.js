import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCb3O3mwrZnycpDs8sv7XJKbPE0gvRsqD4',
	authDomain: 'uran-28-12-98.firebaseapp.com',
	databaseURL: 'https://uran-28-12-98.firebaseio.com',
	projectId: 'uran-28-12-98',
	storageBucket: 'uran-28-12-98.appspot.com',
	messagingSenderId: '113317665845',
	appId: '1:113317665845:web:9b4e3065a9a84b7cd5a57c',
	measurementId: 'G-DDKX9CHS1L',
};

let firebaseInstance;
let functionsInstance;
let storageInstance;
export const getFirebase = () => {
	if (firebaseInstance) {
		return firebaseInstance;
	}

	firebase.initializeApp(firebaseConfig);
	firebase.functions().useFunctionsEmulator('http://localhost:5001');
	firebaseInstance = firebase;

	return firebase;
};
export const getFunctions = () => {
	if (functionsInstance) {
		return functionsInstance;
	}
	if (firebaseInstance) {
		functionsInstance = firebaseInstance.app().functions();
		// functionsInstance = firebaseInstance
		// 	.app()
		// 	.functions('australia-southeast1');
		return functionsInstance;
	} else {
		firebase.initializeApp(firebaseConfig);
		firebase.functions().useFunctionsEmulator('http://localhost:5001');

		firebaseInstance = firebase;
		functionsInstance = firebase.app().functions();
		// functionsInstance = firebase.app().functions('australia-southeast1');
		return functionsInstance;
	}
};
export const getStorage = () => {
	if (storageInstance) {
		return storageInstance;
	}
	if (firebaseInstance) {
		storageInstance = firebaseInstance.storage();
		return storageInstance;
	} else {
		firebase.initializeApp(firebaseConfig);
		firebaseInstance = firebase;
		storageInstance = firebase.storage();

		return storageInstance;
	}
};
