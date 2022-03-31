import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUnKNz4TBGNuLOgwvMjDKDAUyBlTp1Blw",
  authDomain: "banhcanhbathua-4dc50.firebaseapp.com",
  projectId: "banhcanhbathua-4dc50",
  storageBucket: "banhcanhbathua-4dc50.appspot.com",
  messagingSenderId: "1002293704070",
  appId: "1:1002293704070:web:8abd2c859d61bebd6f6807",
  measurementId: "G-ET3VRMLGNH",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
export default firebase;
