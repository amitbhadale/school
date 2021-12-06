import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAedQQMssBL4avwESr5IF9GwjkC9bJfPqk",
  authDomain: "school-312c3.firebaseapp.com",
  projectId: "school-312c3",
  storageBucket: "school-312c3.appspot.com",
  messagingSenderId: "601704053485",
  appId: "1:601704053485:web:b23d79e23f1f5d8fdf2ae4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, addDoc };
