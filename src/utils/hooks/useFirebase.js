import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../firebase";
import { initializeApp } from "firebase/app";

const useFirebase = () => {
    // Initialize Firebase 
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const signUpWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    return { signUpWithEmailAndPassword, app, loginWithEmailAndPassword }
}

export default useFirebase;