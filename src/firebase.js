
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAjyoLFHDIAjLto-SXWS8BzNPmtgJppdlw",
  authDomain: "fortnite-eb802.firebaseapp.com",
  databaseURL: "https://fortnite-eb802.firebaseio.com",
  projectId: "fortnite-eb802",
  storageBucket: "fortnite-eb802.appspot.com",
  messagingSenderId: "105848314276",
  appId: "1:105848314276:web:d7c83d9351b9b398af0931",
  measurementId: "G-YJWTQW6YY5"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };