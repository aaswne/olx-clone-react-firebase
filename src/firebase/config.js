import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBbgkgDOUcDRCf4qiaQ_BoH2_VUbtKwLZg",
  authDomain: "olx-clone-8fb6e.firebaseapp.com",
  projectId: "olx-clone-8fb6e",
  storageBucket: "olx-clone-8fb6e.firebasestorage.app",
  messagingSenderId: "1052620112782",
  appId: "1:1052620112782:web:4a5ce9d2ce90ef89081adf",
  measurementId: "G-245NE3J5PN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;





