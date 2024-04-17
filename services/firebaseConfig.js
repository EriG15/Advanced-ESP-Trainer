import * as firebase from 'firebase'

  const firebaseConfig = {
  apiKey: "AIzaSyDflZqKU3TIN6iaqYaAB8BZtr9nz16y_dI",
  authDomain: "localvibe-84968.firebaseapp.com",
  projectId: "localvibe-84968",
  storageBucket: "localvibe-84968.appspot.com",
  messagingSenderId: "125966739424",
  appId: "1:125966739424:web:5ba20b4ce39c381cdfed85"
};

let app = !firebase.default.apps.length ? firebase.default.initializeApp(firebaseConfig) : firebase.default.app();
const auth = firebase.default.auth(app);

export { app, auth }