import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCzXl587Gk4s_a0xeYPu-ZkhqB1rxl5v_0",
    authDomain: "olx-clone-ff6ac.firebaseapp.com",
    projectId: "olx-clone-ff6ac",
    storageBucket: "olx-clone-ff6ac.appspot.com",
    messagingSenderId: "5368337415",
    appId: "1:5368337415:web:1c938fff4dacd844dec6a2",
    measurementId: "G-85T4HCJ07S"
  };

export default firebase.initializeApp(firebaseConfig)