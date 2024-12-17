// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID
  apiKey: "AIzaSyCwjF89Skfg4Nytl06WOO2aK3BoxBPV9wo",
  authDomain: "web-thuc-tap-cn.firebaseapp.com",
  projectId: "web-thuc-tap-cn",
  storageBucket: "web-thuc-tap-cn.firebasestorage.app",
  messagingSenderId: "452737362776",
  appId: "1:452737362776:web:2b979eb8cea0a7b687932d"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);