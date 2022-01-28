import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCvdnoda9Ikk-JaupXiFD-6_nmtcoFxqb0",
  authDomain: "clone-771cc.firebaseapp.com",
  projectId: "clone-771cc",
  storageBucket: "clone-771cc.appspot.com",
  messagingSenderId: "10002172349",
  appId: "1:10002172349:web:32d54735109fb148a9aad4",
  measurementId: "G-MEXZL8ZV4N",
});

const storage = firebase.storage();

export { storage };
