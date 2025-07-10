import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // tambahkan ini

const firebaseConfig = {
  apiKey: "AIzaSyANa3hSuHOumdqB178ukcspB5T_aw4tzLg",
  authDomain: "backend-api-tokosenjata.firebaseapp.com",
  projectId: "backend-api-tokosenjata",
  storageBucket: "backend-api-tokosenjata.appspot.com",
  messagingSenderId: "667909410294",
  appId: "1:667909410294:web:46c312b52f369a507c8bd7",
  measurementId: "G-XPGD69Z5N2",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); // inisialisasi Firestore

export { auth, db }; // export keduanya
