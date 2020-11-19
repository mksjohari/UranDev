const testEnv = require('firebase-functions-test')({
  databaseURL: 'https://Uran.firebaseio.com',
  storageBucket: 'Uran.appspot.com',
  projectId: 'uran-28-12-98',
},'./path/to/private-key.json');

const admin = require('firebase-admin');

console.log(test);

describe('testing basic function', () =>{
  it('test function returns 6', () =>{
    expect(index.basicTest()).toBe(6);
  });
});



let index,adminStub;
beforeAll(() =>{
    adminStub = jest.spyOn(admin, 'initializeApp');
    index = require('./example');
    return;
});



afterAll(() =>{
  adminStub.mockRestore();
  testEnv.cleanup();
});
