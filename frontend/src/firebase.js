import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuqo7z9WvAHYZAm3gQT2YXnO683frJzMk",
  authDomain: "blokus-database.firebaseapp.com",
  projectId: "blokus-database",
  storageBucket: "blokus-database.appspot.com",
  messagingSenderId: "230057725648",
  appId: "1:230057725648:web:da6ad8a8585208e70b58d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
// export const storageRef = ref(storage);

// Initialize Firebase Firestore
export default getFirestore();
