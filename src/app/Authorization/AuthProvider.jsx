/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";
import React, { createContext, useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import app from "./Firebase/Firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const googleLogin = () => {
    return signInWithPopup(auth, GoogleProvider);
  };

  const registerWIthEmailAndPassword = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const accessLogin = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //   if (currentUser) {
      //     axios
      //       .post("https://vedhak-iamnahid591998-gmailcom.vercel.app/jwt", {
      //         email: currentUser.email,
      //       })
      //       .then((res) => {
      //         localStorage.setItem("access-token", res.data.token);
      //         setIsLoading(false);
      //       });
      //   } else {
      //     localStorage.removeItem("access-token");
      //     setIsLoading(false);
      //   }
    });
    return () => {
      return unsubscribe();
    };
  }, []);
  const updateUser = (name, photo) => {
    setIsLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const logOut = () => {
    return signOut(auth);
  };
  const authInfo = {
    user,
    isLoading,
    registerWIthEmailAndPassword,
    updateUser,
    accessLogin,
    googleLogin,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
