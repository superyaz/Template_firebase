import * as firebase from "firebase";


const config = {
  apiKey: "AIzaSyDkxWBSYS_C0jz3HKekskjKj7cerjnpmZk",
  authDomain: "quinteropartners-20193.firebaseapp.com",
  databaseURL: "https://quinteropartners-20193.firebaseio.com",
  projectId: "quinteropartners-20193",
  storageBucket: "quinteropartners-20193.appspot.com",
  messagingSenderId: "274882359387",
  appId: "1:274882359387:web:b9c1faec62f61fdc4d0f7e"
};

firebase.initializeApp(config);
export const db = firebase.firestore();


const databaseRef = firebase.database().ref();
export const userRef = databaseRef.child("users");
export const authRef = firebase.auth();
export const storage = firebase.storage();
