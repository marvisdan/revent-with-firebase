import firebase from 'firebase';

import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDf7AXHwLbnUo0f8MwBQgQQfOTWj0W0Tt8",
  authDomain: "revents-213210.firebaseapp.com",
  databaseURL: "https://revents-213210.firebaseio.com",
  projectId: "revents-213210",
  storageBucket: "",
  messagingSenderId: "268861221680"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true,
};
firestore.settings(settings);
export default firebase;