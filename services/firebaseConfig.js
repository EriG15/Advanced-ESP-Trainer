import * as firebase from 'firebase'

  const firebaseConfig = {
  apiKey: "AIzaSyCCGAM2_thguINbXRhpRczad5TJcvmtL8Y",
  authDomain: "esp-trainer-8f1d0.firebaseapp.com",
  projectId: "esp-trainer-8f1d0",
  storageBucket: "esp-trainer-8f1d0.appspot.com",
  messagingSenderId: "837172371134",
  appId: "1:837172371134:web:6949a225d8b65a323e08ef"
};

let app = !firebase.default.apps.length ? firebase.default.initializeApp(firebaseConfig) : firebase.default.app();
const auth = firebase.default.auth(app);

export { app, auth }