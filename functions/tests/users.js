const amirahha = {
  uid: 'amirahha-doe-32406338',
  firstname: 'Amirahha',
  lastname: 'Doe',
  email: 'hiremepls@mail.com',
  password: 'password1234',
  description: 'I am amirahha',
  expertise: ['Engineering & Mathematics'],
  location: 'earth',
  occupation: 'prof',
  photoURL: '',
  role: 'Jobseeker',
  skills: {
    'dev': 10,
    'crying': 1
  },
  tools: {
    'heroku': 90,
    'latex': 809
  },
  socials: {
    "figma": ""
  },
  _collections: {
    projects: [],
    projectPreviews: []
  }
};

// addUserDetails = async (
// 	uid,
// 	photoURL,
// 	allExpertise,
// 	firstStep,
// 	secondStep,
// 	thirdStep

const signUpAma = {
  uid: 'ama-dooe-32406338',
  photoURL: '',
  allExpertise: {
    expertise: {
      id1: true,
      id2: false,
      id3: false,
      id4: false,
      id5: true,
      id6: false,
      id7: false,
      id8: true,
      id9: false,
      id10: false,
    } 
  },
  firstStep: {
    role: 'Jobseeker',
    firstName: 'Ama',
    lastName: 'Dooe',
    imgSrc: 'default',
    img:
      'https://firebasestorage.googleapis.com/v0/b/uran-28-12-98.appspot.com/o/static%2Fdefault.jpg?alt=media&token=dac35811-de8e-41c6-9915-ed31a077f641',
  },
  secondStep: {
    occupation: 'prof',
    location: '',
    description: '',
  },
  thirdStep: {
    linkedIn: 'https://www.linkedin.com/in/',
    github: 'https://www.github.com/',
    slack: 'https://www.slack.com/',
    codeSandBox: 'https://codesandbox.io/u/',
    behance: 'https://www.behance.net/',
    figma: 'https://figma.com/',
    dribble: 'https://dribbble.com/',
  }

};

const john = {
  uid: "john-doe-32999338",
  firstname: 'John',
  lastname: 'Doe',
  email: 'hiremepls@mail.com',
  password: '12345678',
  description: 'I am NOT amirahha',
  expertise: ['Creative Arts'],
  location: 'mars',
  occupation: 'student',
  photoURL: '',
  role: 'Jodseeker',
  skills: {
    'art': 20,
    'crying': 100
  },
  tools: {
    'acrylic': 12,
    'clay': 5
  },
  socials: {
    "figma": ""
  }
};

module.exports = {
  signUpAma,
  amirahha,
  john
}
