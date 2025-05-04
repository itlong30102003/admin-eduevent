import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Cấu hình Firebase của bạn
const firebaseConfig = {
    apiKey: "AIzaSyB4voPmPeBWGpwZrCk-OoV-OtLR4buiBI4",
    authDomain: "ktgk-b761a.firebaseapp.com",
    projectId: "ktgk-b761a",
    storageBucket: "ktgk-b761a.appspot.com",
    messagingSenderId: "162244598463",
    appId: "1:162244598463:web:8344fad62798035794c40a",
    measurementId: "G-HGSH45HJS0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);