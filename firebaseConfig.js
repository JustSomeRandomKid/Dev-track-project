import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAiEcbZ3L0y9Dl6v4PGsPnK1iI96qFa6ew",
    authDomain: "my-site-321.firebaseapp.com",
    databaseURL: "https://my-site-321-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "my-site-321",
    storageBucket: "my-site-321.appspot.com",
    messagingSenderId: "308515755821",
    appId: "1:308515755821:web:b9455d014ee2c214ec65a4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };