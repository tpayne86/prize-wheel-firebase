import {createContext, useContext, useEffect, useReducer, useState} from 'react'

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth, signInWithGooglePopup, auth,
} from '../utils/firebase';
import {onAuthStateChanged, signOut} from "firebase/auth";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      console.log(payload);
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  function logIn() {
    return signInWithGooglePopup()
  }
  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setCurrentUser(user);
    });

    return () => { unsubscribe() };
  }, []);

  console.log(currentUser);
  const value = {
    currentUser,
    logIn,
    logOut
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
