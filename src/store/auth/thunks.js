import { async } from "@firebase/util";
import { loginWithEmailAndPassword, registerWithEmailAndPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = (email, password) => {

    return async (dispatch) => {

        dispatch( checkingCredentials() );

    }

}

export const startGoogleSignIn = () => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if( !result.ok ){
            return dispatch( logout( result.errorMessage ) );
        }

        dispatch( login( result ) );

    }

}

export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {

    return async ( dispatch ) => {

        dispatch( checkingCredentials() );
        const result = await registerWithEmailAndPassword( {email, password, displayName} );

        if( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) );

    }

}

export const startLoginWithEmailAndPassword = () => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const resp = await loginWithEmailAndPassword({ email, password });
        console.log( resp );
        if( !resp.ok ) return dispatch( logout( result.errorMessage ) );

    }

}
