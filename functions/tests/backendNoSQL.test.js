const testEnv = require('firebase-functions-test')(
  {
    apiKey: "AIzaSyCb3O3mwrZnycpDs8sv7XJKbPE0gvRsqD4",
    authDomain: "uran-28-12-98.firebaseapp.com",
    databaseURL: "https://uran-28-12-98.firebaseio.com",
    projectId: "uran-28-12-98",
    storageBucket: "uran-28-12-98.appspot.com",
    messagingSenderId: "113317665845",
    appId: "1:113317665845:web:9b4e3065a9a84b7cd5a57c",
    measurementId: "G-DDKX9CHS1L",
  },
  './path/to/private-key.json'
);

const users = require('./users');
const admin = require('firebase-admin');
const { mockFirebase } = require('firestore-jest-mock');
const { mockCollection } = require('firestore-jest-mock/mocks/firestore');

// CLEANING/ SETTING UP //
let index, adminStub;
beforeAll(() =>{
    adminStub = jest.spyOn(admin, 'initializeApp');
  
    return;
});

afterAll(() =>{
  adminStub.mockRestore();
  testEnv.cleanup();
  jest.clearAllMocks();
});


// Create a fake Firestore with a `users` and `posts` collection
mockFirebase({
  database: {
    users: [
      {
        ...users.amirahha,
        id: users.amirahha.uid
      }
    ],
  },
});


// TESTS //
describe('testing GET functions', () =>{
  it('Get user based on uid', () => {
    const firebase = require('firebase'); // or import firebase from 'firebase';
    const db = firebase.firestore();
  
    return db
      .collection('users')
      .doc(users.amirahha.uid)
      .get().then(doc => {
          expect(mockCollection).toHaveBeenCalledWith('users');
          expect(doc.exists).toBe(true);
          expect(doc.ref.id).toBe(users.amirahha.uid);
      });
      
  });

  it('Get user NOT in database', () => {
    const firebase = require('firebase'); // or import firebase from 'firebase';
    const db = firebase.firestore();
  
    return db
      .collection('users')
      .doc(users.john.uid)
      .get().then(doc => {
          expect(mockCollection).toHaveBeenCalledWith('users');
          expect(doc.exists).toBe(false);
      });
      
  });

  // it('test create Account', async () => {
  //   const amirahha = users.amirahha;
  //   const uuid = users.amirahha.uid;
  //   const result = await controller.createAccount({...amirahha, uuid: uuid});

  //   expect(result.data).toBe(`Error occurred adding user`);//`Successfully added ${uuid}`);
  // }
  // );

  it('test Add Account Details', () => {
    const signUpAma = users.signUpAma;
    const firebase = require('firebase'); // or import firebase from 'firebase';
    const db = firebase.firestore();
  
    return db
      .collection('users')
      .doc(signUpAma.uid)
      .set({
        uid: signUpAma.uid,
        firstName: signUpAma.firstStep.firstName,
        lastName: signUpAma.firstStep.lastName,
        role: signUpAma.firstStep.role,
        photoUrl: signUpAma.photoURL,
        occupation: signUpAma.secondStep.occupation,
        location: signUpAma.secondStep.location,
        description: signUpAma.secondStep.description,
        expertise: signUpAma.allExpertise,
        socials: signUpAma.thirdStep,
        skills: {},
        tools: {},
      })
      .then(doc => {
        expect(doc.exists).toBe(true);
        expect(doc.ref.id).toBe(signUpAma.uid);
      })
  });

});
