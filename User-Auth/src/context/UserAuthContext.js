import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  reload
} from "firebase/auth";
import { ref, set, get } from "firebase/database"; // import 'get'
import { auth, database } from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await reload(currentUser);
        let role = "user";
        if (currentUser.email === "elvis.oteng'o@strathmore.edu") {
          role = "admin";
        } else if (currentUser.email === "") {
          role = "sadmin";
        }
        setUser({ ...currentUser, role });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logIn = async (email, password) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    await reload(user);
    let role = "user";
    if (user.email === "elvis.oteng'o@strathmore.edu") {
      role = "admin";
    } else if (user.email === "") {
      role = "sadmin";
    }
    setUser({ ...user, role });
    return { ...user, role };
  };

  const signUp = async (email, password) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(user);
    await set(ref(database, 'users/' + user.uid), {
      email: user.email,
      uid: user.uid,
      emailVerified: user.emailVerified,
    });
    let role = "user";
    if (user.email === "elvis.oteng'o@strathmore.edu") {
      role = "admin";
    } else if (user.email === "") {
      role = "sadmin";
    }
    setUser({ ...user, role });
    return { ...user, role };
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  const googleSignIn = async () => {
    const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
    await reload(user);
    let role = "user";
    if (user.email === "elvis.oteng'o@strathmore.edu") {
      role = "admin";
    } else if (user.email === "") {
      role = "sadmin";
    }
    setUser({ ...user, role });
    return { ...user, role };
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

