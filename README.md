

<!-- Uran -->
<br />
<p align="center">
  <a href="https://bit.ly/34R2g4T">
    <img src="https://firebasestorage.googleapis.com/v0/b/uran-28-12-98.appspot.com/o/static%2Flogo.svg?alt=media&token=f5038044-a679-4a90-a782-3a101ba42a94" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Uran</h3>
  <hr />
</p>

<a href="https://bit.ly/34R2g4T"><h2> [Live Demo]</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/uran-28-12-98.appspot.com/o/static%2Fdisplay.png?alt=media&token=7aadf899-005c-44d9-bf59-d6c82c9f9710" alt="Logo" width="100%" ></a>


<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Uran](#what-uran-is)
  * [Built With](#built-with)
  * [Built By](#built-by)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project


### What Uran is
* LinkedIns more practical Twin
* An Eportfolio website that enables anyone to demonstrate their strengths easily
* A seemless project creation process that's driven around the popular STAR method

### Built With
Uran was built using popular frameworks and technologies including
* [React](https://react.org)
* [Firebase](firebase.google.com/)
* [Google Cloud Platform](https://cloud.google.com/)

### Built By
Uran was built by 4 main contributers
* [Angelina Lim](https://github.com/Angelinalim911)
* [Hao Yuan Cheang](https://github.com/cheang-haoyuan)
* [Khairi Johari](https://github.com/mksjohari)
* [Michelle Edhie Wahidin](https://github.com/michelle-ew)

<!-- GETTING STARTED -->
## Getting Started

Project Link: [https://www.uran-28-12-98.web.app/](https://www.uran-28-12-98.web.app/)

If you would like to locally test out our product follow the following steps :smile:

### Prerequisites

You will need npm and firebase-cli to repcliate this project
You can get npm from here: (https://www.npmjs.com/get-npm)
* git
* npm
* firebase-cli

```sh
npm install -g firebase-tools
```

### Installation
1. Clone the repo
```sh
git clone https://github.com/mksjohari/UranDev
```
2. Install NPM packages
```sh
npm install
```
3. Create a free Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
4. Find the config under project settings (Should look like this)
```js
var firebaseConfig = {
  apiKey: "AIzaSyDOCAbC123dEf456GhI789jKl01-MnO",
  authDomain: "myapp-project-123.firebaseapp.com",
  databaseURL: "https://myapp-project-123.firebaseio.com",
  projectId: "myapp-project-123",
  storageBucket: "myapp-project-123.appspot.com",
  messagingSenderId: "65211879809",
  appId: "1:65211879909:web:3ae38ef1cdcb2e01fe5f0c",
  measurementId: "G-8GSGZQ44ST"
};
```
5. Replace these values in the config file found in src/shared/firebase/config 
6. Create a Cloud SQL Instance on the Google Cloud Platform and copy down these key values
```JS
 {
    "host": "**.**.****.***",
    "path": "*:*:*",
    "database": "development",
    "port": "3306",
    "connectionname": "*:*:*",
    "ip": "***.***.***.***",
    "user": "***",
    "pass": "***********"
  }
```
7. Add these SQL variables to firebase environment variables
```JS
firebase functions:config:set cloudSQL.id={step 6 values}
```
8. Play around yourself!
```JS
npm start
```

### Contact

For any enquires and questions feel free to email (ninaruservices@gmail.com)



