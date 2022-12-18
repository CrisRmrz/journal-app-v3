import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FireBaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

// Para disparar el popup de google
export const signInWithGoogle = async() => {

    try {

        const result = await signInWithPopup( FireBaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult( result ); 
        const user = result.user; //Aqui viene toda la info, como nombre de usuario, correo, idGoogle, photoURL
        
        const { displayName, email, photoURL, uid } = user;

        return {
            ok: true,
            //user info
            displayName,
            email,
            photoURL,
            uid
        }
        
        
    } catch (error) {

        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }

}

export const registerWithEmailAndPassword = async({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword(FireBaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        await updateProfile( FireBaseAuth.currentUser, {displayName});

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

        
    } catch (error) {
        console.log(error.message)
        return {
            ok: false, errorMessage: error.message
        }
    }

}

export const loginWithEmailAndPassword = async({ email, password }) => {

    try {

        const resp = await signInWithEmailAndPassword(FireBaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }


    } catch (error) {
        console.log(error.message)
        return {
            ok: false,
            errorMessage: error.message
        }
    }

}