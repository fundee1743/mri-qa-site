import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7ayf07kzR8VTXxldL3_no7alBFRgxSLQ",
  authDomain: "mri-qa-site.firebaseapp.com",
  projectId: "mri-qa-site",
  storageBucket: "mri-qa-site.firebasestorage.app",
  messagingSenderId: "396181126942",
  appId: "1:396181126942:web:928c51b624809f55f2930f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
