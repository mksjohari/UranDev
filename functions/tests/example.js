// Copied from https://medium.com/@h.malik144/jest-testing-for-firebase-functions-a51ce1094d38

const functions = require('firebase-functions');

exports.basicTest = function(){
  const a = 1;
  const b = 5;
  return a + b;
}

exports.helloWorld = functions.https.onRequest((req, res) => {
  console.log(res, res.status);
  res.send('Hello World');
});
