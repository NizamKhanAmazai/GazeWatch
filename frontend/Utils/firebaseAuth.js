import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "gaze-watch.firebaseapp.com",
  projectId: "gaze-watch",
  storageBucket: "gaze-watch.firebasestorage.app",
  messagingSenderId: "743902494588",
  appId: "1:743902494588:web:86e10cc6cd76ab3dcceef9"
};   

const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
const provider =new GoogleAuthProvider(); 
export {Auth, provider}