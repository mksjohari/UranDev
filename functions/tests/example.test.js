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
const controller = require('../../src/shared/firebase/firebase');
const admin = require('firebase-admin');
const mysql = require('mysql');
const { mockFirebase } = require('firestore-jest-mock');
const { mockCollection } = require('firestore-jest-mock/mocks/firestore');
// const { StatusType, Users, UserType } = require("../src/entity/users");
// const { Seeker } = require("../src/entity/seeker");
// const { Expertise } = require("../src/entity/expertise");
// const { Skills } = require("../src/entity/skills");
// const { Tools } =require("../src/entity/tools");

// Create a fake Firestore with a `users` and `posts` collection
mockFirebase({
  database: {
    users: [
      {
        ...users.amirahha,
        id: users.amirahha.uid
      },
      {
        ...users.john,
        id: users.john.uid
      }
    ],
  },
});

// CLEANING/ SETTING UP //
let index, adminStub;
beforeAll(() =>{
    adminStub = jest.spyOn(admin, 'initializeApp');
    index = require('./example');
    jest.mock('../../src/shared/firebase/firebase');
    jest.mock('mysql');
    // console.log(index);
    return;
});

afterAll(() =>{
  adminStub.mockRestore();
  testEnv.cleanup();
  jest.clearAllMocks();
});

// jest.mock(connect = async () => {
//   return await createConnection({
//       type: "mysql",
//       host: testEnv.mockConfig({ cloudsql: { host: 'localhost' }}),
//       port: testEnv.mockConfig({ cloudsql: { port: '8888' }}),
//       username: testEnv.mockConfig({ cloudsql: { user: 'me' }}),
//       password: testEnv.mockConfig({ cloudsql: { pass: '' }}),
//       database: testEnv.mockConfig({ cloudsql: { database: 'test' }}),
//       //entities: [Users, Seeker, Skills, Tools, Expertise],
//       synchronize: true,
//   });
// });

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
          expect(doc.id).toBe(users.amirahha.uid);
      });
      
  });
  
// getFirebase().firestore().collection('users').doc(uid).get()

  it('test create Profile returns success', async () => {
    const amirahha = users.amirahha;
    const uuid = users.amirahha.uid;
    const result = await controller.createAccount({...amirahha, uuid: uuid});

    expect(result).toBe(`Successfully added ${uuid}`);
  }
  );

  it('test function returns 6', () =>{
    expect(index.basicTest()).toBe(6);
  });

  it('firebase HTML function test', (done) =>{
    // A fake request object
    const req = {};
    // A fake response object, with a send
    const res = {
      send: (response) => {
        //Run the test in response callback of the HTTPS function
        expect(response).toBe('Hello World');
        //done() is to be triggered to finish the function
        done();
      }
    };
    index.helloWorld(req,res);
  });

});
