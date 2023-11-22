import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAp7ZEvcq6XXLKCz6HQAhnI63hZ_FbwJHU",
  authDomain: "eduschedule-d1a25.firebaseapp.com",
  projectId: "eduschedule-d1a25",
  storageBucket: "eduschedule-d1a25.appspot.com",
  messagingSenderId: "334815692882",
  appId: "1:334815692882:web:cd7bc0029d677b826fb78b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };