import firebase from 'firebase';
const firebaseConfig = {
	apiKey: process.env.FIREBASE_APIKEY,
	authDomain: process.env.FIREBASE_AUTHDOMAIN,
	projectId: process.env.FIREBASE_PROJECTID,
	storageBucket: process.env.FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
	appId: process.env.FIREBASE_APPID,
	measurementId: process.env.FIREBASE_MEASUREMENTID,
};


  const app = firebase.initializeApp(firebaseConfig);

  const db = app.firestore();

  const auth = app.auth();

  export { db,auth};