import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  //firebase config
});

const storage = firebase.storage();

export { storage };
