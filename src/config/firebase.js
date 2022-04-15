import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyC74DNTqynujOkMHuS-fDZkeUcebWwDhYk",
  authDomain: "fir-app-99b2d.firebaseapp.com",
  projectId: "fir-app-99b2d",
  storageBucket: "fir-app-99b2d.appspot.com",
  messagingSenderId: "34373527021",
  appId: "1:34373527021:web:3fb9b8ae83f5445afdb3e4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
