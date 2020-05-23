import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC_gUNVuSkJp8k50kwTLaASkqRcBXK0Kog",
    authDomain: "crwn-db-6534a.firebaseapp.com",
    databaseURL: "https://crwn-db-6534a.firebaseio.com",
    projectId: "crwn-db-6534a",
    storageBucket: "crwn-db-6534a.appspot.com",
    messagingSenderId: "659111940878",
    appId: "1:659111940878:web:6cee43a7ee2bbee2b17d5f",
    measurementId: "G-DS7YPDL19N"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await userRef.set({
                displayName, 
                email, 
                createdAt, 
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }
    
    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;