// Import the functions you need from the SDKs you need
import { FieldPath } from '@firebase/firestore-types'
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  where,
  writeBatch,
  query,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBv27KkeQTE5m3Fe78-p0ZGFzS3aYtBCjU",
  authDomain: "coupon-wheel.firebaseapp.com",
  projectId: "coupon-wheel",
  storageBucket: "coupon-wheel.appspot.com",
  messagingSenderId: "414373477174",
  appId: "1:414373477174:web:415c67d360a1f792af9197",
  measurementId: "G-372G3FQ9NL"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
const PrizesRef = collection(db, 'Prizes');
const UserRef = collection(db, 'User');
const WheelHistoryRef = collection(db, 'WheelHistory');
const WheelSettingsRef = collection(db, 'Wheels')

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'User', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};


export async function getWheelPrizes(prizes) {
  const prizeSegments = [];
  const prizeQuery = query(PrizesRef, where(FieldPath.documentId(), 'in', prizes));
  const querySnapshot = await getDocs(prizeQuery);
  querySnapshot.forEach(doc => {
    const data = doc.data();
    console.log('data: ', data);
    prizeSegments.push(data);
  })
  return prizeSegments;
}

export async function getWheelSettings(id) {
  const wheelRef = doc(db, 'Wheels', id);
  const docSnap = await getDoc(wheelRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log(data);
    const segments = await getWheelPrizes(data.segments);
    console.log(segments)
    return {
      ...data,
      segments
    };
  }
}
