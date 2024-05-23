import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  reload,
  updateEmail
} from "firebase/auth";
import axios from 'axios';
import { ref, set } from "firebase/database";
import { auth, database } from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await reload(currentUser);
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false); // Update loading state
    });

    return () => unsubscribe();
  }, []);

  const logIn = async (email, password) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    await reload(user);
    setUser(user); // Update user state
    return user;
  };

  const signUp = async (email, password) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(user);
    await set(ref(database, 'users/' + user.uid), {
      email: user.email,
      uid: user.uid,
      emailVerified: user.emailVerified,
    });
    return user;
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null); // Clear user state on logout
  };

  const googleSignIn = async () => {
    const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
    await reload(user);
    setUser(user); // Update user state
    return user;
  };

  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut, googleSignIn, loading }}>
      {children}
    </userAuthContext.Provider>
  );
}

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
