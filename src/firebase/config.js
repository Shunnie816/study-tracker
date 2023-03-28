// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCutuavqNxoyCjQqUsonvqEO_Cx1iVsH2Q",
  authDomain: "study-trucker.firebaseapp.com",
  projectId: "study-trucker",
  storageBucket: "study-trucker.appspot.com",
  messagingSenderId: "116934855471",
  appId: "1:116934855471:web:59955cd11e6b41754eefda",
  measurementId: "G-K2XT98GRRH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
