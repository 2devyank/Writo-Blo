import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAlz-OWdsycvFskfYV2CeXlL_OTqcLzZHc",
  authDomain: "blog-b3ac2.firebaseapp.com",
  projectId: "blog-b3ac2",
  storageBucket: "blog-b3ac2.appspot.com",
  messagingSenderId: "433030019024",
  appId: "1:433030019024:web:ae13225f4e28131f026bd5",
  measurementId: "G-JXEQT13J68"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth=getAuth(app);
export const db=getFirestore(app);
export const provider=new GoogleAuthProvider();
const storage=getStorage(app);