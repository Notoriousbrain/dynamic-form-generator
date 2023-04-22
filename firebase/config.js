// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSb_eSQQJk7o_12aHRNI8sla15xrRdEb8",
  authDomain: "form-builder-53ce7.firebaseapp.com",
  databaseURL:
    "https://form-builder-53ce7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "form-builder-53ce7",
  storageBucket: "form-builder-53ce7.appspot.com",
  messagingSenderId: "855188196860",
  appId: "1:855188196860:web:28a602f317642cd22af679",
  measurementId: "G-5B7WCEG8XZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
