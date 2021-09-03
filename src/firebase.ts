import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyA4rQ5NEI7MhrQGXjZoHcy2ZTi-mf__8eQ",
    authDomain: "slack-clone-aa760.firebaseapp.com",
    projectId: "slack-clone-aa760",
    storageBucket: "slack-clone-aa760.appspot.com",
    messagingSenderId: "786266106796",
    appId: "1:786266106796:web:164d8574203e2bae76a809",
    measurementId: "G-WLXDQZ7BNF",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider, app };
