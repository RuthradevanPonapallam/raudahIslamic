import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { browserLocalPersistence } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDxcHUuCR5Zrc7J1wDej4r07HIcEcPmTxs",
    authDomain: "raudahislamic-de28b.firebaseapp.com",
    projectId: "raudahislamic-de28b",
    storageBucket: "raudahislamic-de28b.appspot.com",
    messagingSenderId: "186126529540",
    appId: "1:186126529540:web:a0bc914476707226e93151"
};

let app;

try {
    app = initializeApp(firebaseConfig);
} catch (error) {
    console.error('Error initializing Firebase: ', error);
}

const auth = getAuth(app);

// Access Firestore
const db = getFirestore(app);
// const videosCollection = collection(db, 'guides');

// Set persistence to LOCAL
getAuth(app).setPersistence(browserLocalPersistence);

export { app, auth, db };