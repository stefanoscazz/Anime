import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyAaUVNT7FVAUHZbn0zWdBSRkei71p17VME",
    authDomain: "anime-3656a.firebaseapp.com",
    projectId: "anime-3656a",
    storageBucket: "anime-3656a.appspot.com",
    messagingSenderId: "882983143984",
    appId: "1:882983143984:web:bd970fa0a5286c53be3bf5"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();



export { auth, provider, storage };
export default db;