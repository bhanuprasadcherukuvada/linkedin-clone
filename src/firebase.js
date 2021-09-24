import firebase from 'firebase';
const firebaseConfig = {
	apiKey: "AIzaSyA2iI9zmybEsPhB945MsVrktg7ZJwGCP64",
	authDomain: "linkedin-ui-clone-6b4c1.firebaseapp.com",
	projectId: "linkedin-ui-clone-6b4c1",
	storageBucket: "linkedin-ui-clone-6b4c1.appspot.com",
	messagingSenderId: "476018980857",
	appId: "1:476018980857:web:5361c9daa919bf8293af28",
	measurementId: "G-EFM55F22Y9",
};


  const app = firebase.initializeApp(firebaseConfig);

  const db = app.firestore();

const auth = app.auth(); 
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

  export { db,auth,googleProvider,githubProvider};