import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAhfNz84BuDV4R9KhbLsjcA54o4lNDERJU',
  authDomain: 'reactjs-firebase-boilerplate.firebaseapp.com',
  databaseURL: 'https://reactjs-firebase-boilerplate.firebaseio.com',
  projectId: 'reactjs-firebase-boilerplate',
  storageBucket: 'reactjs-firebase-boilerplate.appspot.com',
  messagingSenderId: '1081320296000',
  appId: '1:1081320296000:web:3d97614672f466706959a5',
  measurementId: 'G-BS2E1Z8XVZ',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// Not including this in features/Authentication because
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (
  userAuth: firebase.User,
  additionalData?: firebase.firestore.DocumentData
) => {
  if (!userAuth) return;

  // Get a reference to the place in the database where the user is stored
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('error creating user', error.message); // eslint-disable-line no-console
    }
  }

  return getUserDocumentRef(userAuth.uid); // eslint-disable-line consistent-return
};

/* eslint-disable consistent-return */
export const getUserDocumentRef = async (uid: string | undefined) => {
  if (!uid) return null;

  try {
    return firestore.doc(`users/${uid}`);
  } catch (error) {
    console.error('error fetching user', error.message); // eslint-disable-line no-console
  }
};

export default firebase;
