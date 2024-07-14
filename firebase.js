import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, doc, collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyDUe74FxI3Tn-hKCTDHmbpflEHfOg9zXC0",
    authDomain: "todo-2024d.firebaseapp.com",
    projectId: "todo-2024d",
    storageBucket: "todo-2024d.appspot.com",
    messagingSenderId: "16251777216",
    appId: "1:16251777216:web:7c32909fbd9a7919167d25",
    measurementId: "G-0JWEGE5RDJ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{
    db,
    doc,
    collection, 
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    getDoc
}



