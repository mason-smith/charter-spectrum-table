import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAAQF9aupdIx9lCfdNduEpcaNV6Ypbw1JE',
  authDomain: 'charter-spectrum-table.firebaseapp.com',
  databaseURL: 'https://charter-spectrum-table.firebaseio.com',
  projectId: 'charter-spectrum-table',
  storageBucket: 'charter-spectrum-table.appspot.com',
  messagingSenderId: '585827779669',
  appId: '1:585827779669:web:c9b2854be0abc4c10ac0dc',
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
