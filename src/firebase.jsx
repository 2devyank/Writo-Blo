import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY,
  authDomain:import.meta.env.VITE_D ,
  projectId: import.meta.env.VITE_PID,
  storageBucket: import.meta.env.VITE_SB,
  messagingSenderId:import.meta.env.VITE_MSI,
  appId: import.meta.env.VITE_APPID,
  measurementId:import.meta.env.VITE_MID
};

// console.log(import.meta.env.VITE_SOME_KEY)
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth=getAuth(app);
export const db=getFirestore(app);
export const provider=new GoogleAuthProvider();
export const storage=getStorage(app);