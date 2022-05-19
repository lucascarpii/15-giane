// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  getFirestore,
  onSnapshot,
  collection,
  deleteDoc,
  updateDoc,
  getDocs,
  getDoc,
  addDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFVvB6wUD9FAsTC05uS9IElkXW8nbm5AU",
  authDomain: "giane-15.firebaseapp.com",
  projectId: "giane-15",
  storageBucket: "giane-15.appspot.com",
  messagingSenderId: "265009689055",
  appId: "1:265009689055:web:7bae191a84c718e1e3546a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, description) => {
  addDoc(collection(db, "tasks"), { title, description });
};

export const getTasks = () => getDocs(collection(db, "tasks"));

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);
