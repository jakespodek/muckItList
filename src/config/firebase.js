// firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyA3T1GCrjFwZAi8BOyEBv_VDt4ONZXYR44",
    authDomain: "muck-it-list.firebaseapp.com",
    projectId: "muck-it-list",
    storageBucket: "muck-it-list.appspot.com",
    messagingSenderId: "919871546824",
    appId: "1:919871546824:web:eae4ababfc091785900cfd"
};

firebase.initializeApp(firebaseConfig);

export default firebase;