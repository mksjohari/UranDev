const testEnv = require('firebase-functions-test')({
  databaseURL: "https://uran-28-12-98.firebaseio.com",
  projectId: "uran-28-12-98",
  storageBucket: "uran-28-12-98.appspot.com",
},'./path/to/private-key.json');

const admin = require('firebase-admin');

let index,adminStub;
beforeAll(() =>{
    adminStub = jest.spyOn(admin, 'initializeApp');
    index = require('./example');
    // console.log(index);
    return;
});

afterAll(() =>{
  adminStub.mockRestore();
  testEnv.cleanup();
});

describe('testing basic function', () =>{
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
