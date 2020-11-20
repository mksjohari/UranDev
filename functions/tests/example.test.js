// jest.mock('../../src/shared/firebase/firebase');

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

let index, adminStub;

beforeAll(() =>{
    adminStub = jest.spyOn(admin, 'initializeApp');
    index = require('./example');
    // console.log(index);
    return;
});


const users = require('./users');
const { createAccount } = require('../../src/shared/firebase/firebase');
const admin = require('firebase-admin');

afterAll(() =>{
  adminStub.mockRestore();
  testEnv.cleanup();
});

describe('testing GET functions', () =>{
  it('test create Profile returns success', async () => {
    const amirahha = users.amirahha;
    const uuid = 'testID';
    const result = await createAccount(amirahha);

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
